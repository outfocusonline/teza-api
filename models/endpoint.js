'use strict';

const mongoose = require('mongoose');

const endpointSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	model: {
		type: Object,
		required: true
	},
	isUser: {
		type: Boolean,
		required: false
	},
	version: {
		type: Number,
		required: false
	},
	authenticated: {
		type: Boolean,
		required: false
	}
});

module.exports = mongoose.model('Endpoint', endpointSchema);