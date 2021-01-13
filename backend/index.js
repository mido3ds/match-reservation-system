// dependencies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config'); // e.g: config.get('database.password')
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express();

// routes modules
const login = require('./routes/login');
const users = require('./routes/users');
const managers = require('./routes/managers');
const matches = require('./routes/matches');
const stadiums = require('./routes/stadiums');
const tickets = require('./routes/tickets');

// midlewares
function setupMiddlewares() {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
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
    await mongoose.connect(config.get('database.connection'), { useNewUrlParser: true, useUnifiedTopology: true });
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
    app.use(morgan('combined'));
    startupDebugger('Morgan is enabled...');
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => startupDebugger(`listening on port ${port}...`));
}

async function runServer() {
  try {
    await connectDB();
    setupMiddlewares();
    setupRoutes();
    setupPort();
  } catch {

  }
}

runServer();