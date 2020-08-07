/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Request } = require("./models/request");
const { User } = require("./models/user");
const { Profile } = require("./models/profile");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
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

// A POST route to login to a user account and create a session
app.post("/user/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Get user account by username and password
    User.getUser(username, password)
        .then(user => {
            req.session.user = user._id;
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send('Bad Request');
        })
});

// A GET route to check if a user is logged into session
app.get("/user/session", (req, res) => {
    if (req.session.user) {
        User.findById(req.session.user)
            .then(user => {
                res.send({currentUser: user});
            })
            .catch(error => {
                res.status(500).send('Internal Server Error');
            });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// a GET route to get all requests
app.get("/requests", (req, res) => {
    Request.find()
        .then(requests => {
            log();
            res.send({ requests }); // can wrap in object if want to add more properties
        })
        .catch(error => {
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
