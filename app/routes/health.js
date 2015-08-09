'use strict';

var Q = require('q');

module.exports = function (mongo) {

  // This endpoint is used for health check of the application.
  // It responds with status code 200 when health check passes,
  // and returns 500 when critical infrastrutures such as mongodb
  // is no longer reachable.
  function health(req, res, next) {
    var checks = [
      // check mongo health
      Q.ninvoke(mongo.admin(), 'listDatabases')

      // add additional checks as promises below...
    ];

    Q.all(checks)

      // all checks passed.
      .then(function() {
        res.send(200, {status: 'ok'});
      })

      // error handling and promise chain termination.
      .nodeify(next);
  }

  return health;
};

module.exports['@require'] = ['mongo'];
module.exports['@singleton'] = true;
