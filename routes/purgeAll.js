const express = require('express');

// Bring in models
const Endpoint = require('../models/endpoint');

const router = express.Router();

router.post('/', (req, res, next) => {
	console.log("_purge_all requested.")
	// Purge happens
});

module.exports = router;
