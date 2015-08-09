'use strict';

var fs = require('fs');
var Q = require('q');

module.exports = function () {
  // WARNING: VERY INSECURE!!! DO NOT USE THIS!!!
  //
  // This endpoint accepts `path` in URL query string
  // and return a list of files contained within `path`.
  //
  // Example Response:
  //   {
  //     "files": ["file1", "file2"]
  //   }
  //
  function readdir(req, res, next) {
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
  }

  return readdir;
};

module.exports['@singleton'] = true;
