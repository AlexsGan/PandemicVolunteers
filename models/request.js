/* Student mongoose model */
'use strict';

const mongoose = require('mongoose')

const Request = mongoose.model('Request', {
	requestHost: {
		type: String, // TODO: this should be the user object
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
	}
})

module.exports = { Request }