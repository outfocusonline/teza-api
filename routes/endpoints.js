const express = require('express');

const messages = require('../utils/messageHandler');

const router = express.Router();

// Bring in models
const Endpoint = require('../models/endpoints');

const endPoints = (tezaDb) => {

	// LIST all endpoints
	router.get('/', (req, res) => {

	});

	// CREATE endpoint route
	router.post('/', (req, res) => {
		const { body } = req;

		const newEndpoint = new Endpoint(body)

		newEndpoint.save((err, newEndpoint) => {
			if(err) messages.sendErr(res, 500, 'Error saving endpoint');
			else res.json(newEndpoint.model)
		})
	});

	// DELETE endpoint route
	router.delete('/:name', (req, res) => {
		const { name } = req.params;
	});

	// EDIT endpoint route
	router.post('/:name/:option', (req, res) => {
		const { name, option } = req.params;
	});

	return router;
};

module.exports = endPoints;
