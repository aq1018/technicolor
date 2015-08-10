'use strict';

module.exports = function() {
  var ioc = require('electrolyte');
  var restify = require('restify');

  // Configure dependency injection
  ioc.loader('routes', ioc.node('app/routes'));
  ioc.loader('repositories', ioc.node('app/repositories'));
  ioc.loader('services', ioc.node('app/services'));
  ioc.loader(ioc.node('app/infrastructure'));

  // Create server
  var server = restify.createServer({
    name: 'AQ Interview Server'
  });

  // Configure server middleware
  server.use(restify.requestLogger());
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser({ mapParams: false }));
  server.use(restify.bodyParser({ mapParams: true }));

  // setup routes
  server.post('/auth', ioc.create('routes/auth'));
  server.get('/readdir', ioc.create('routes/readdir'));
  server.get('/health', ioc.create('routes/health'));

  // Boot server
  server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

  return server;
};
