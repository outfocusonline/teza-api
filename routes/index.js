'use strict';

const express = require('express');

const endpoints = require('./endpoints');
const purgeAll = require('./purgeAll');
const collectionExists = require('../utils/collectionExists')

const router = express.Router();

router.use('/_endpoints', endpoints);

router.use('/_purge_all', purgeAll);

router.get('/:post', function(req, res, next) {
	if (collectionExists(req.params.post)) res.end("Well done, I'm surprised");
	const err = new Error('Not found');
	err.status = 404
	next(err)
})

/* If no other patterns match, GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Teza' });
});

module.exports = router;
