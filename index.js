#! /usr/bin/env node

'use strict';

// set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').load();

// start app
require('./app')();

// load fixture when in development mode for demo purposes.
// This app's real purpose is for interview after all...
if(process.env.NODE_ENV === 'development') {
  var fixtures = require('./spec/support/fixtures');
  var records = require('./spec/fixtures/users');
  fixtures.populate('users', records);
}
