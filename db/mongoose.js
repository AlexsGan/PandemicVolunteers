/*
    Database connection for server
 */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/VolunteersAPI'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

mongoose.set('returnOriginal', false); // Queries return newly updated objects instead of originals)

module.exports = { mongoose }  // Export the active connection.