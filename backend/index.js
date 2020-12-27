// dependencies
const Joi = require('joi'),
  express = require('express'),
  helmet = require('helmet'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  config = require('config'), // e.g: config.get('database.password')
  startupDebugger = require('debug')('app:startup'),
  dbDebugger = require('debug')('app:db'),
  app = express();

// routes modules
const login = require('./routes/login'),
  users = require('./routes/users'),
  managers = require('./routes/managers'),
  matches = require('./routes/matches'),
  stadiums = require('./routes/stadiums'),
  tickets = require('./routes/tickets');

// other requires
const schema = require('./schema');

// midlewares
function setupMiddlewares() {
  app.use(express.json());
  app.use(helmet());
}

// routes
function setupRoutes() {
  app.use('/api/login', login);
  app.use('/api/users', users);
  app.use('/api/managers/requests', managers);
  app.use('/api/matches', matches);
  app.use('/api/stadiums', stadiums);
  app.use('/api/tickets', tickets);
}

// setup database
async function connectDB() {
  try {
    await mongoose.connect(config.get('database.connection'),  {useNewUrlParser: true, useUnifiedTopology: true});
    dbDebugger('connected to MongoDB...');
    // const User = mongoose.model('User', schema.userSchema);
    // const Stadium = mongoose.model('Stadium', schema.stadiumSchema);
    // const Match = mongoose.model('Match', schema.matchSchema);
    // const Ticket = mongoose.model('Ticket', schema.ticketSchema);
  } catch {
    dbDebugger('couldn\'t connect to MongoDB...');
  }
}

function setupPort() {
  // process.env.NODE_ENV
  if (app.get('env') === 'development') {
    app.use(morgan());
    startupDebugger('Morgan is enabled...');
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => startupDebugger(`listening on port ${port}...`));
}

function runServer() {
  try {
    connectDB();
    setupMiddlewares();
    setupRoutes();
    setupPort();
  } catch {

  }
}

runServer();