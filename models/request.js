/* Student mongoose model */
'use strict';

const mongoose = require('mongoose');
// const User = mongoose.model('User');

const HelpRequest = mongoose.model('HelpRequest', {
	requestHost: {
		type: String, // TODO: the user who created the helpRequest
		// required: true,
		minlength: 1,
		trim: true
	},
	time: {
		type: String,
		// required: true,
	},
	requestContent: {
		type: String,
		required: true,
		trim: true,
    },
    // acceptedUsers: {
    //     type: [UserSchema],
    // }
})

module.exports = { HelpRequest }