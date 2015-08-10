#! /usr/bin/env node

'use strict';

// set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').load();

// start app
require('./app')();
