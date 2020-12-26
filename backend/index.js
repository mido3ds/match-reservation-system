// dependencies
const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config'); // e.g: config.get('database.password')
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express()

// routes modules
const login = require('./routes/login');
const users = require('./routes/users');
const managers = require('./routes/managers/requests');
const matches = require('./routes/matches');
const stadiums = require('./routes/stadiums');
const tickets = require('./routes/tickets');

// midlewares
app.use(express.json());
app.use(helmet());

// routes
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/managers/requests', managers);
app.use('/api/matches', matches);
app.use('/api/stadiums', stadiums);
app.use('/api/tickets', tickets);

// process.env.NODE_ENV
if (app.get('env') === 'development') {
	app.use(morgan());
	startupDebugger('Morgan is enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));