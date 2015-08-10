/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../support');

var path = require('path');
var superagent = require('superagent');
var createApp = require('../../app');

describe('Interview app', function() {
  var app;

  before(function() {
    app = createApp();
  });

  after(function() {
    app.close();
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

});
