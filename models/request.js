/* Student mongoose model */
'use strict';

const UserSchema = require('./user').UserSchema;

const mongoose = require('mongoose');

const HelpRequest = mongoose.model('HelpRequest', {
	requestHost: {
		type: String, // TODO: the user who created the helpRequest
		// required: true,
		minlength: 1,
		trim: true
	},
	time: {
		type: String,
		default: new Date()
		// required: true,
	},
	requestContent: {
		type: String,
		required: true,
		trim: true,
    },
    // acceptedUsers: { // list of users approved by the requestHost
    //     type: [UserSchema],
	// },
	// pendingUsers: {	 // list of users waiting to be approved by the requestHost
	// 	type: [UserSchema],
	// }
})

module.exports = { HelpRequest }