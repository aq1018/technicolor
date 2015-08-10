/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../../support');

var Q = require('q');
var httpMocks = require('node-mocks-http');
var handler = ioc.create('routes/health');

describe('routes', function() {
  describe('health', function() {
    it('returns status ok', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/health'
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();

        expect(res.statusCode).to.equal(200);
        expect(data.status).to.equal('ok');
      }).nodeify(done);
    });
  });
});
