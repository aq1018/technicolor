/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../helper');

var Q = require('q');
var httpMocks = require('node-mocks-http');
var mongo = ioc.create('mongo');
var handler = ioc.create('routes/auth');
var fixtures = require('../../support/fixtures');

describe('routes', function() {
  describe('auth', function() {
    before(function(done) {
      var records = require('../../fixtures/users');
      fixtures.populate('users', records).nodeify(done);
    });

    after(function(done) {
      fixtures.truncate('users').nodeify(done);
    });

    it('authenticates with valid credentical', function(done) {
      var req = httpMocks.createRequest({
        method: 'POST',
        url: '/auth',
        params: {
          username: 'alice',
          password: 'changeme'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.authenticated).to.be.true;
      }).nodeify(done);
    });

    it('does not authenticate with invalid password', function(done) {
      var req = httpMocks.createRequest({
        method: 'POST',
        url: '/auth',
        params: {
          username: 'alice',
          password: 'wrong password'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.authenticated).to.be.false;
      }).nodeify(done);
    });

    it('does not authenticate with invalid username', function(done) {
      var req = httpMocks.createRequest({
        method: 'POST',
        url: '/auth',
        params: {
          username: 'i dont exist',
          password: 'changeme'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.authenticated).to.be.false;
      }).nodeify(done);
    });
  });
});
