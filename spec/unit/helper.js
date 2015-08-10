'use strict';

// set default node environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('dotenv').load();

// setup IoC
var ioc = require('electrolyte');

// Configure dependency injection
ioc.loader('routes', ioc.node('app/routes'));
ioc.loader('repositories', ioc.node('app/repositories'));
ioc.loader('services', ioc.node('app/services'));
ioc.loader(ioc.node('app/infrastructure'));

// set global vars needed for testing
global.expect = require('chai').expect;
global.ioc = ioc;
