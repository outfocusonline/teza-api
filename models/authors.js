const mongoose = require('mongoose');

// Author Schema

const authorSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: false
	},
	username: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	picture: {
		type: String,
		required: false
	},
	facebook: {
		type: String,
		required: false
	},
	twitter: {
		type: String,
		required: false
	},
	website: {
		type: String,
		required: false
	}
});

const Author = module.exports = mongoose.model('Author', authorSchema);