/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../../support');

var path = require('path');
var Q = require('q');
var httpMocks = require('node-mocks-http');
var handler = ioc.create('routes/readdir');

describe('routes', function() {
  describe('readdir', function() {
    it('returns a list of files', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/readdir',
        query: {
          path: path.normalize(path.join(__dirname, '..', '..', 'fixtures', 'dirtest'))
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();

        expect(res.statusCode).to.equal(200);
        expect(data.files).to.deep.equal(['file1', 'file2']);
      }).nodeify(done);
    });
  });
});
