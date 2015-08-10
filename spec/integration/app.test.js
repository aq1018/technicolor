/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../support');

var path = require('path');
var superagent = require('superagent');
var createApp = require('../../app');

describe('Interview app', function() {

  // setup test server
  var app;

  before(function() {
    app = createApp();
  });

  after(function() {
    app.close();
  });

  // setup fixtures
  var fixtures = require('../support/fixtures');

  before(function(done) {
    var records = require('../fixtures/users');
    fixtures.populate('users', records).nodeify(done);
  });

  after(function(done) {
    fixtures.truncate('users').nodeify(done);
  });

  describe('GET /health', function() {
    it('returns good status', function(done) {
      superagent
        .get('http://localhost:3000/health')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({status: "ok"});
          done(err);
        });
    });
  });

  describe('GET /readdir', function() {
    it('returns a list of files', function(done) {
      var dirtestPath = path.normalize(
        path.join(__dirname, '..', 'fixtures', 'dirtest')
      );

      superagent
        .get('http://localhost:3000/readdir?path=' + dirtestPath)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({ files: [ "file1", "file2" ] });
          done(err);
        });
    });
  });

  describe('POST /auth', function() {
    it('authenticates a valid user', function(done) {
      superagent
        .post('http://localhost:3000/auth')
        .set('Accept', 'application/json')
        .send({username: 'alice', password: 'changeme'})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({ authenticated: true });
          done(err);
        });
    });

    it('does not authenticate with invalid password', function(done) {
      superagent
        .post('http://localhost:3000/auth')
        .set('Accept', 'application/json')
        .send({username: 'alice', password: 'bad passowrd'})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({ authenticated: false });
          done(err);
        });
    });

    it('does not authenticate with invalid user', function(done) {
      superagent
        .post('http://localhost:3000/auth')
        .set('Accept', 'application/json')
        .send({username: 'aaron', password: 'bad passowrd'})
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.deep.equal({ authenticated: false });
          done(err);
        });
    });
  });

  describe('GET /users', function() {
    it('returns a list of users', function(done) {
      superagent
        .get('http://localhost:3000/users?profession=programmer&citysort=-1')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.users.length).to.equal(2);
          done(err);
        });
    });
  });
});
