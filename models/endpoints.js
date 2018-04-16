'use strict';

const mongoose = require('mongoose');

const endpointsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	version: {
		type: Number,
		required: false
	},
	authenticated: {
		type: Boolean,
		required: false
	},
	deleted: {
		type: Boolean,
		required: false,
		default: false
	},
	deletedAt: {
		type: Date,
		required: false
	}
});

module.exports = mongoose.model('Endpoints', endpointsSchema);