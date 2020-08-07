/* Student mongoose model */
const mongoose = require('mongoose')

const Request = mongoose.model('Request', {
	requestHost: {
		type: String, // TODO: this should be the user object
		required: true,
		minlegth: 1,
		trim: true
	},
	time: {
		type: String,
		required: true,
	}
})

module.exports = { Request }