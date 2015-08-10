'use strict';

// set default node environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

// setup common test infrastructure
require('./ioc');
require('./globals');
