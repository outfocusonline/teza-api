sendErr = (res, status, message = "Unknown error happened.") => {
	res.status(status);
	res.json({
		error: message
	});
};

log = (type, message) => {
	console[type](message)
}

module.exports = {
	sendErr,
	log
};