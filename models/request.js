/* Student mongoose model */
'use strict';

const mongoose = require('mongoose');
const UserSchema = mongoose.model('User').schema;

const HelpRequest = mongoose.model('HelpRequest', {
	requestHost: {
		type: UserSchema, // the user object
		required: true,
		minlength: 1,
		trim: true
	},
	time: {
		type: String,
		required: true,
    },
    acceptedUsers: {
        type: [UserSchema],
    }
})

module.exports = { HelpRequest }