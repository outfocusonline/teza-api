const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
	console.log("_purge_all requested.")
	// Purge happens
});

module.exports = router;
