'use strict';

var Q = require('q');

module.exports = function (mongo) {
  return function (req, res, next) {
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
  };
};

module.exports['@require'] = ['mongo'];
module.exports['@singleton'] = true;
