/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../../support');

var Q = require('q');
var httpMocks = require('node-mocks-http');
var handler = ioc.create('routes/users');
var fixtures = require('../../support/fixtures');

describe('routes', function() {
  describe('users', function() {
    before(function(done) {
      var records = require('../../fixtures/users');
      fixtures.populate('users', records).nodeify(done);
    });

    after(function(done) {
      fixtures.truncate('users').nodeify(done);
    });

    it('return a list of users filtered by profession', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        query: {
          profession: 'programmer'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.users.length).to.equal(2);
        expect(data.users[0]).to.contain.keys(['_id', 'username', 'profession', 'city']);
      }).nodeify(done);
    });

    it('sorts by city with ascending order by default', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        query: {
          profession: 'programmer'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.users.length).to.equal(2);
        expect(data.users[0].city).to.equal('Los Angeles');
        expect(data.users[1].city).to.equal('San Francisco');
      }).nodeify(done);
    });

    it('sorts by city with descending order if specify citysort to -1', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        query: {
          profession: 'programmer',
          citysort: '-1'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        var data = res._getData();
        expect(data.users.length).to.equal(2);
        expect(data.users[0].city).to.equal('San Francisco');
        expect(data.users[1].city).to.equal('Los Angeles');
      }).nodeify(done);
    });

    it('responds with 400 when no profession is given', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/user'
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        expect(res.statusCode).to.eql(400);
      }).nodeify(done);
    });

    it('responds with 400 if citysort value is invalid', function(done) {
      var req = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        query: {
          profession: 'programmer',
          citysort: 'woot?'
        }
      });

      var res = httpMocks.createResponse();

      Q.nfcall(handler, req, res).then(function() {
        expect(res.statusCode).to.eql(400);
      }).nodeify(done);
    });
  });
});
