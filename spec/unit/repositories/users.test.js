/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../../support');

var Q = require('q');
var mongo = ioc.create('mongo');
var users = ioc.create('repositories/users');
var fixtures = require('../../support/fixtures');

describe('repositories', function() {
  describe('users', function() {
    describe('.getByUsername', function() {
      before(function(done) {
        var records = require('../../fixtures/users');
        fixtures.populate('users', records).nodeify(done);
      });

      after(function(done) {
        fixtures.truncate('users').nodeify(done);
      });

      it('returns null when user is not found', function(done) {
        users
          .getByUsername('aaron')
          .then(function(user) {
            expect(user).to.be.null;
          })
          .nodeify(done);
      });

      it('returns user when user is found', function(done) {
        users
          .getByUsername('bob')
          .then(function(user) {
            expect(user).to.exist;
            expect(user).to.contain.keys(['_id', 'username']);
            expect(user.username).to.equal('bob');
          })
          .nodeify(done);
      });

    });
  });
});
