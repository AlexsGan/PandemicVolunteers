"use strict";
const log = console.log;

const express = require("express");
// Start express
const app = express();

// Mongoose & MongoDB
const { mongoose } = require("./db/mongoose");
mongoose.set('bufferCommands', false);  // Don't buffer if not connected
mongoose.set('useFindAndModify', false); // Deprecation

// import the mongoose models
const { HelpRequest } = require("./models/request");
const { User } = require("./models/user");
const { Profile } = require("./models/profile");

// ObjectID validation
const { ObjectID } = require("mongodb");

/**
 * Middleware
 **/

// Parses HTTP JSON body into JS object
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Manages user sessions
const session = require("express-session");

// Mongoose connection check middleware
const mongoConnectCheck = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        res.status(500).send('Internal Server Error');
    } else {
        next();
    }
}

// Authentication middleware
const authenticate = (req, res, next) => {
    if (req.session && req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject();
            } else {
                req.user = user.username;
                next();
            }
        }).catch((err) => {
            if (isMongoError(err)) {
                res.status(500).send("Internal Server Error");
            }
            res.status(401).send("Unauthorized user.");
        })
    } else {
        console.error(`UNAUTHORIZED ATTEMPT TO ${req.method}`);
        res.status(401).send("Unauthorized user.");
    }
}

// Log new requests to console
app.use((req, res, next) => {
    res.on('finish', function () {
        if (['api', 'session'].includes(req.path.split('/')[1])) {
            log(`${req.method} Request to ${req.path} by user "${req.user || ''}"`);
        }
    })
    next();
})

/**
 * Helpers
 **/

// Check if user is an admin
function isAdmin(id) {
    if (!ObjectID.isValid(id)) {
        return false;
    }
    let isAdmin = false;
    User.findById(id)
        .then((user) => {
            if (user) {
                isAdmin = user.isAdmin;
            }
        })
        .catch((err) => {
            isAdmin = false;
        });
    return isAdmin;
}

// Send mongoose validation errors
function handleValidationError(err) {
    let errorsToSend = [];
    if (err.name === 'ValidationError') {
        for (const errorPath of Object.keys(err.errors)) {
            // Send each error
            errorsToSend.push({
                type: errorPath,
                message: err.errors[errorPath].message
            });
        }
        return errorsToSend;
    } else {
        return null;
    }
}

function handleUserCreationErrors(err, res) {
    if (isMongoError(err)) {
        res.status(500).send("Internal Server Error");
        return;
    }
    const validationErrors = handleValidationError(err);
    if (validationErrors) {
        res.status(400).send(validationErrors);
    } else {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send(`Specified username conflicts with existing user.`)
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
}

function handleProfileCreationErrors(err, res) {
    if (isMongoError(err)) {
        res.status(500).send("Internal Server Error");
        return;
    }
    const validationErrors = handleValidationError(err);
    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }
    res.status(500).send('Internal Server Error');
}

// Check for mongo database disconnection
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/**
 * Session Handling
 **/

// Create a session cookie
app.use(
    session({
        secret: "volunteers-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 60 * 1000, // 30 minutes
            httpOnly: true
        }
    })
);

// A GET route to check if a user is logged into session
app.get("/session/check-session", (req, res) => {
    const session = req.session || {};
    if (session.user) {
        User.findById(session.user)
            .then(user => {
                res.send(user.toJSON());
            })
            .catch((err) => {
                res.status(500).send('Internal Server Error');
            });
    } else {
        res.status(401).send('Unauthorized user.');
    }
});

// A POST route to login to a user account and create a session
app.post("/session/login", mongoConnectCheck, (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';

    // Get user account by username and password
    User.getUser(username, password)
        .then(user => {
            req.session.user = user._id;
            log(`LOGIN: ${user.username} was logged in`);
            res.send(user.toJSON());
        })
        .catch((err) => {
            if (isMongoError(err)) {
                res.status(500).send("Internal Server Error");
                return;
            }
            res.status(401).send('Invalid username or password.');
        });
});

// A POST route to logout a user and delete the session
app.post("/session/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).send('Internal Server Error');
            } else {
                res.send();
            }
        });
    } else {
        res.send();
    }
});

/**
 *  API Routes
 **/

// A POST route to register a new user account
app.post("/api/users", mongoConnectCheck, (req, res) => {
    const userObject = req.body.userObject || {};
    // Prevent creation of admin account through POST route
    if (userObject.isAdmin) {
        res.status(403).send('Unauthorized to create admin user');
        return;
    } else {
        // Explicitly set isAdmin to false to be safe
        userObject.isAdmin = false;
    }

    // Create new user account
    User.create(userObject)
        .then((user) => {
            // Simplified user object
            res.send(user.toJSON());
        })
        .catch((err) => {
            handleUserCreationErrors(err, res);
        });
});

// A PATCH route to replace properties of an existing user account
app.patch("/api/users/:username", mongoConnectCheck, authenticate, (req, res) => {
    const creator = req.user || '';
    const username = req.params.username || '';
    const props = req.body.props || {};
    // Prevent creation of admin account through PATCH route
    if (props.isAdmin) {
        res.status(403).send('Unauthorized to create admin user');
        return;
    } else {
        // Explicitly set isAdmin to false to be safe
        props.isAdmin = false;
    }
    // Attempt by a non-admin to update a different user
    if (username !== creator && !isAdmin(creator)) {
        res.status(403).send(`${creator} Forbidden to update profile of '${username}'.`);
        return;
    }
    // All attributes in schema
    const propPaths = Object.keys(User.schema.paths);

    // Find the fields to update and their values
    const propsToUpdate = {}
    for (const prop of Object.keys(props)) {
        if (prop.charAt(0) === '_' || !propPaths.includes(prop)) {
            res.status(403).send(`Setting attribute ${prop} is forbidden.`);
            return;
        }
        propsToUpdate[prop] = props[prop];
    }

    // Find user by username and update its properties
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(404).send(`User '${username}' not found.`);
            } else {
                user.set(propsToUpdate);
                return user.save();
            }
        })
        .then((user) => {
            if (user) {
                res.send(user.toJSON());
            }
        })
        .catch((err) => {
            handleUserCreationErrors(err, res);
        });
});

// A DELETE route to delete a user account
app.delete("/api/users/:username", mongoConnectCheck, authenticate, (req, res) => {
    const username = req.params.username || '';
    const creator = req.user || '';
    // Attempt by a non-admin to delete a different user
    if (username !== creator && !isAdmin(creator)) {
        res.status(403).send(`${creator} Forbidden to delete account of user '${username}'.`);
        return;
    }

    // Find user by username and delete
    User.findOneAndDelete({ username: username })
        .then((user) => {
            if (!user) {
                res.status(404).send(`User '${username}' not found.`);
            } else {
                res.send(user.toJSON());
            }
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
        });
});

// A GET route to get a user account
app.get("/api/users/:username", mongoConnectCheck, authenticate, (req, res) => {
    const username = req.params.username || '';
    const creator = req.user || '';
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User '${username}' not found.`);
            } else {
                const profile = user.profile;
                const userJson = user.toJSON();
                if (!profile) {
                    res.send(userJson);
                } else {
                    // Attempt to view different user's invisible account by a non admin
                    if (user.username !== creator && !isAdmin(creator) && !profile.isVisible) {
                        // Redact profile
                        const profileJson = {
                            biography: userJson.profile.biography,
                        }
                        userJson.profile = profileJson;
                        res.send(userJson);
                    } else {
                        res.send(userJson);
                    }
                }
            }
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
        });
});

// A PUT route to create/overwrite a user profile
app.put("/api/users/:username/profile", mongoConnectCheck, authenticate, (req, res) => {
    const creator = req.user || '';
    const username = req.params.username || '';
    const profile = req.body.profile || {};

    // Attempt by a non-admin to update a different user's profile
    if (username !== creator && !isAdmin(creator)) {
        res.status(401).send(`${creator} Not authorized to create profile for '${username}'.`);
        return;
    }

    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User '${username}' not found.`);
            } else {
                // Add profile to user
                user.profile = profile;
                return user.save()
            }
        })
        .then((user) => {
            if (user && user.profile) {
                res.send(user.profile.toJSON());
            }
        })
        .catch((err) => {
            if (isMongoError(err)) {
                res.status(500).send("Internal Server Error");
                return;
            }
            const validationErrors = handleValidationError(err);
            if (!validationErrors) {
                res.status(400).send(validationErrors);
                return;
            }
            res.status(500).send('Internal Server Error');
        });
});

// A PATCH route to replace properties of an existing user profile
app.patch("/api/users/:username/profile", mongoConnectCheck, authenticate, (req, res) => {
    const creator = req.user || '';
    const username = req.params.username || '';
    const props = req.body.props || {};

    // Attempt by a non-admin to update a different user
    if (username !== creator && !isAdmin(creator)) {
        res.status(401).send(`${creator} Not authorized to create profile for '${username}'.`);
    }
    // All attributes in schema
    const propPaths = Object.keys(Profile.schema.paths);

    // Find the fields to update and their values
    const propsToUpdate = {}
    for (const prop of Object.keys(props)) {
        if (prop.charAt(0) === '_' || !propPaths.includes(prop)) {
            res.status(403).send(`Setting attribute ${prop} is forbidden.`);
            return;
        }
        propsToUpdate[prop] = props[prop];
    }
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(404).send(`User ${username} does not exist.`);
            } else {
                // Update profile fields
                const profile = user.profile;
                if (!profile) {
                    res.status(404).send(`Profile of user ${username} does not exist.`);
                } else {
                    profile.set(propsToUpdate);
                    return user.save();
                }
            }
        })
        .then((user) => {
            if (user && user.profile) {
                res.send(user.profile.toJSON());
            }
        })
        .catch((err) => {
            handleProfileCreationErrors(err, res);
        });
});

// A GET route to get a user profile
app.get("/api/users/:username/profile", mongoConnectCheck, authenticate, (req, res) => {
    const username = req.params.username || '';
    const creator = req.user || '';
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User '${username}' not found.`);
            } else {
                const profile = user.profile;
                if (!profile) {
                    res.status(404).send(`Profile for user '${username}' not found.`)
                } else {
                    // Attempt to view different user's invisible profile by a non admin
                    if (user._id !== creator && !isAdmin(creator) && !profile.isVisible) {
                        // Unauthorized
                        res.status(401).send("Unauthorized to view profile.");
                    } else {
                        res.send(profile.toJSON());
                    }
                }
            }
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
        });
});

/**
 * Webpage Routes
 **/

// a POST route to *create* a helpRequest
app.post("/requests", (req, res) => {
    // Create a new helpRequest using the HelpRequest mongoose model
    const helpRequest = new HelpRequest({
        requestHost: req.body.requestHost,
        requestContent: req.body.requestContent,
    });

    console.log(helpRequest)

    // Save helpRequest to the database
    helpRequest.save()
        .then(result => {
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err); // 400 for bad request
        });
})

// a GET route to get all helpRequest
app.get("/requests", mongoConnectCheck, (req, res) => {
    HelpRequest.find()
        .then((helpRequests) => {
            res.send({ helpRequests });
        })
        .catch((err) => {
                res.status(500).send('Internal Server Error'); // server error
            }
        );
});
// app.get("/api/requests", mongoConnectCheck, authenticate, (req, res) => {
//     HelpRequest.find()
//         .then((helpRequests) => {
//             res.send({ helpRequests });
//         })
//         .catch((err) => {
//                 res.status(500).send('Internal Server Error'); // server error
//             }
//         );
// });

// TODO
// a POST route to add a pending user to the request they want to help
// app.post('/requests/:id', (req, res) => {    
//     const id = req.params.id

// 	if (!ObjectID.isValid(id)) {
// 		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
// 		return;  // so that we don't run the rest of the handler.
// 	}

// 	HelpRequest.findById(id).then((helpRequest) => {
// 		if (!helpRequest) {
// 			res.status(404).send()
// 		} else {   
// 			// add the new helpRequest 
// 			helpRequest.pendingUsers.push(req.body) // push the User to pendingUsers

// 			helpRequest.save().then((result) => {
// 				res.send({"helpRequest": result})
// 			})
// 		}
// 	})
// 	.catch((error) => {
// 		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
// 			res.status(500).send('Internal server error')
// 		} else {
// 			log(error) // log server error to the console, not to the client.
// 			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
// 		}
// 	})
// })

// TODO
/// a DELETE route to remove a helpRequest by their id.
// app.delete("/requests/:id", (req, res) => {
//     const id = req.params.id;

//     // Validate id
//     if (!ObjectID.isValid(id)) {
//         res.status(404).send();
//         return;
//     }

//     // Delete a helpRequest by their id
//     HelpRequest.findByIdAndRemove(id)
//         .then(helpRequest => {
//             if (!helpRequest) {
//                 res.status(404).send();
//             } else {
//                 res.send(helpRequest);
//             }
//         })
//         .catch(error => {
//             res.status(500).send(); // server error, could not delete.
//         });
// });


app.use(express.static(__dirname + "/client/build"));

// Serve index.html for all other routes
app.get("*", (req, res) => {
    /*const validRoutes = ["/", "/home", "/register", "/register/create-profile", "/my-requests", "/feed", "/login"];
    if (!validRoutes.includes(req.url)) {
        // Url not in expected page routes
        res.status(404);
    }*/

    // Serve index.html
    res.sendFile(__dirname + "/client/build/index.html");
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
