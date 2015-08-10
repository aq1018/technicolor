'use strict';

// setup IoC
var ioc = require('electrolyte');

// Configure dependency injection
ioc.loader('routes', ioc.node('app/routes'));
ioc.loader('repositories', ioc.node('app/repositories'));
ioc.loader('services', ioc.node('app/services'));
ioc.loader(ioc.node('app/infrastructure'));
