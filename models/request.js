/* Student mongoose model */
'use strict';

const mongoose = require('mongoose')

const HelpRequest = mongoose.model('HelpRequest', {
	requestHost: {
		type: String, // TODO: this should be the user object
		required: true,
		minlength: 1,
		trim: true
	},
	time: {
		type: String,
		required: true,
	}
})

module.exports = { HelpRequest }