// dependencies
const Joi = require('joi'),
 	express = require('express'),
 	helmet = require('helmet'),
 	morgan = require('morgan'),
 	mysql = require('mysql'),
 	config = require('config'), // e.g: config.get('database.password')
 	startupDebugger = require('debug')('app:startup'),
 	dbDebugger = require('debug')('app:db'),
 	app = express();

// setup database
db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'match_reservation'
  })

// routes modules
const login = require('./routes/login'),
 	users = require('./routes/users'),
 	managers = require('./routes/managers'),
 	matches = require('./routes/matches'),
 	stadiums = require('./routes/stadiums'),
 	tickets = require('./routes/tickets');

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