'use strict';

var fs = require('fs');
var Q = require('q');

module.exports = function () {
  return function (req, res, next) {
    var path = req.query.path;

    // validate we have a `path` from query string.
    if(!path) {
      var err = new Error('path must be specified.');
      return next(err);
    }

    // get a list of files in directory `path`
    Q.nfcall(fs.readdir, path)

      // render file list
      .then(function(files) {
        res.send({files: files});
      })

      // error handling and promise chain termination.
      .nodeify(next);
  };
};

module.exports['@singleton'] = true;
