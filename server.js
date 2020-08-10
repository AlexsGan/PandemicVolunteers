/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Request } = require("./models/request");
const { User } = require("./models/user");
const { Profile } = require("./models/profile");

// to validate object IDs
const { ObjectID } = require("mongodb");

/** Middleware **/

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

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
        }).catch((error) => {
            res.status(401).send("Unauthorized user.")
        })
    } else {
        res.status(401).send("Unauthorized user.")
    }
}

/** Helpers **/

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
        }).catch((err) => {
        isAdmin = false;
    });
    return isAdmin;
}

// Send mongoose validation errors
function handleValidationError(err, res) {
    let errorsToSend = [];
    if (err.name === 'ValidationError') {
        for (const error of err.errors) {
            // Send each error
            errorsToSend.push({
                type: error.path,
                message: error.message
            });
        }
        res.status(400).send(errorsToSend);
    } else {
        res.status(500).send('Internal Server Error');
    }
}

// Check for mongo database disconnection
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/** Session Handling **/

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
    if (req.session.user) {
        User.findById(req.session.user)
            .then(user => {
                res.send({ currentUser: user });
            })
            .catch(error => {
                res.status(500).send('Internal Server Error');
            });
    } else {
        res.status(401).send('Unauthorized user.');
    }
});

// A POST route to login to a user account and create a session
app.post("/login", mongoConnectCheck, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Get user account by username and password
    User.getUser(username, password)
        .then(user => {
            req.session.user = user._id;
            res.send({ currentUser: user });
        })
        .catch((err) => {
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

/** API Routes **/

// A POST route to register a new user account
app.post("/api/users", mongoConnectCheck, (req, res) => {
    const userObject = res.body.userObject;

    // Create new user account
    User.create(userObject, (err) => {
            handleValidationError(err);
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send('Internal Server Error');
        });
});

// A POST route to save a user profile
app.post("/api/users/:username/profile", mongoConnectCheck, authenticate, (req, res) => {
    const creator = res.user;
    const username = res.params.username;
    const profile = res.body.profile;
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User ${username} not found.`);
            } else {
                // Attempt to save profile to a different user by a non admin
                if (user._id !== creator && !isAdmin(creator)) {
                    res.status(401).send(`Not authorized to create profile for ${username}.`);
                } else {
                    // Add profile to user
                    user.profile.push(profile);
                    user.save((err) => {
                            handleValidationError(err);
                        })
                        .catch((err) => {
                            res.status(500).send('Internal Server Error')
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
    const username = res.params.username;
    const creator = res.user;
    // Find user by username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`User ${username} not found.`);
            } else {
                const profile = user.profile;
                if (!profile) {
                    res.status(404).send(`Profile for user ${username} not found.`)
                } else {
                    // Attempt to view different user's invisible profile by a non admin
                    if (user._id !== creator && !isAdmin(creator) && !profile.isVisible) {
                        // Unauthorized, send redacted profile
                        res.status(401).send({
                            profile: {
                                firstName: profile.firstName,
                                lastName: profile.lastName
                            }
                        })
                    } else {
                        res.send(profile);
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
            res.send({ requests }); // can wrap in object if want to add more properties
        })
        .catch((err) => {
                res.status(500).send('Internal Server Error'); // server error
            }
        );
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
