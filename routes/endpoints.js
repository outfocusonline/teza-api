const express = require('express');

// Bring in models
const Endpoint = require('../models/endpoint');

const router = express.Router();

router.post('/:option/:value', (req, res, next) => {
	option = req.params.option;
	value = req.params.value;
	switch(option) {
		case 'add': console.log('ADD detected'); break;
		case 'remove': console.log('REMOVE detected'); break;
		case 'deprecate': console.log('DEPRECATE detected'); break;
		default: console.log('Error in /endpoints');
	};
	res.end(option);
});

/* GET list of endpoints. */
router.get('/', (req, res, next) => {
	Endpoint.find({}, (err, endpoints) => {
		if(err) console.log(err);
		res.json({
			title: "Endpoints",
			endpoints: endpoints
		});
	});
});

module.exports = router;
