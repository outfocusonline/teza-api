'use strict';

const express = require('express');

const endpoints = require('./endpoints');
const purgeAll = require('./purgeAll');
const collectionExists = require('../utils/listCollections');
const router = express.Router();

const createRoutes = tezaDb => {
	// Call endpoints router
	router.use('/_endpoints', endpoints(tezaDb));

	// Check for a created collection
	router.get('/:post', function (req, res, next) {
		if (collectionExists(req.params.post)) {
			return res.end("Well done, I'm surprised");
		};
		const err = new Error('Not found');
		err.status = 404;
		return next(err);
	})
	/* If no other patterns match, GET home page. */
	router.get('/', function (req, res, next) {
		res.render('index', {
			title: 'Teza'
		});
	});

	return router;
}

module.exports = createRoutes;