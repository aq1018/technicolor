/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../support');

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
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          done(err);
        });
    });
  });
});
