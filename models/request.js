/* Student mongoose model */
'use strict';

require('./user'); // we'll use the User schema

const mongoose = require('mongoose');
const UserSchema = mongoose.model('User').schema;

const HelpRequest = mongoose.model('HelpRequest', {
	requestHost: {
		type: UserSchema, // TODO: the user who created the helpRequest
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
    // acceptedUsers: { // list of users approved by the requestHost
    //     type: [UserSchema],
	// },
	// pendingUsers: {	 // list of users waiting to be approved by the requestHost
	// 	type: [UserSchema],
	// }
})

module.exports = { HelpRequest }