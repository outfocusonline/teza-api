'use strict';

/* (These stunts are performed under controlled circumstances
	under expert supervision. Do not try this at home.) */

global.models = { endpoints: require('./models/endpoints') };
const models = global.models;

// Native
const path = require('path');

// Modules
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ofs_test');
const tezaDb = mongoose.connection;

const db = require('./lib/dbmodule');

// Check DB connection and load endpoints to memory
tezaDb.once('open', () => {
	console.log("[mongo] Connected to MongoDB");
	db.find('endpoints', {})
		.then((res) => {
			res.map(x => Object.assign(models, { [x.name]: x.model }));
			console.log("[Teza] Loaded endpoints to memory");
		})
		.catch(console.error);
});

// Check DB errors
tezaDb.on('error', (err) => {
	console.log(err);
});

const routes = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(tezaDb));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;