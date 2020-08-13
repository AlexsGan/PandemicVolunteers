"use strict";
const log = console.log;

const express = require("express");
// Start express
const app = express();

// Mongoose & MongoDB
const { mongoose } = require("./db/mongoose");
mongoose.set('bufferCommands', false);  // Don't buffer if not connected
mongoose.set('useFindAndModify', false); // Deprecation

// Mongoose models
const { Request } = require("./models/request");
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
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((err) => {
            if (isMongoError(err)) {
                res.status(500).send("Internal Server Error");
            }
            res.status(401).send("Unauthorized user.")
        })
    } else {
        res.status(401).send("Unauthorized user.")
    }
}

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
            expires: 60000,
            httpOnly: true
        }
    })
);

// A GET route to check if a user is logged into session
app.get("/check-session", (req, res) => {
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
app.post("/login", mongoConnectCheck, (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';

    // Get user account by username and password
    User.getUser(username, password)
        .then(user => {
            req.session.user = user._id;
            res.send(user.toJSON());
        })
        .catch((err) => {
            if (isMongoError(err)) {
                res.status(500).send("Internal Server Error");
            }
            res.status(400).send('Invalid username or password.');
        });
});

// A POST route to logout a user and delete the session
app.post("/logout", (req, res) => {
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
app.post("/api/users", bodyParser.json(), mongoConnectCheck, (req, res) => {
    const userObject = req.body.userObject || {};
    // Prevent creation of admin account through POST route
    userObject.isAdmin = false;

    // Create new user account
    User.create(userObject)
        .then((user) => {
            // Simplified user object
            res.send(user.toJSON());
        })
        .catch((err) => {
            const validationErrors = handleValidationError(err);
            if (!validationErrors) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    res.status(403).send(`User '${userObject.username}' already exists on server.`)
                } else {
                    res.status(500).send('Internal Server Error');
                }
            } else {
                res.status(400).send(validationErrors);
            }
        });
});

// A GET route to get a user account
app.get("/api/users/:username", mongoConnectCheck, authenticate, (req, res) => {
    const username = req.params.username || '';
    const creator = req.user && req.user.username ? req.user.username : '';
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
                        // Redact birthday
                        delete userJson.birthday;
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

// A POST route to save a user profile
app.post("/api/users/:username/profile", mongoConnectCheck, authenticate, (req, res) => {
    const creator = req.user && req.user.username ? req.user.username : '';
    const username = req.params.username || '';
    const profile = req.body.profile || {};
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User '${username}' not found.`);
            } else {
                // Attempt to save profile to a different user by a non admin
                if (user.username !== creator && !isAdmin(creator)) {
                    res.status(401).send(`${creator} Not authorized to create profile for '${username}'.`);
                } else {
                    // Add profile to user
                    user.profile = profile;
                    user.save()
                        .then((user) => {
                            res.send(user.profile.toJSON());
                        })
                        .catch((err) => {
                            const validationErrors = handleValidationError(err);
                            if (!validationErrors) {
                                res.status(500).send('Internal Server Error');
                            } else {
                                res.status(400).send(validationErrors);
                            }
                        });
                }
            }
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
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

// a GET route to get all requests
app.get("/api/requests", mongoConnectCheck, authenticate, (req, res) => {
    Request.find()
        .then((requests) => {
            res.send({ requests });
        })
        .catch((err) => {
                res.status(500).send('Internal Server Error'); // server error
            }
        );
});

/**
 * Webpage Routes
 **/

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
