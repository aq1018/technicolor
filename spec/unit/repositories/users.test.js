/* globals describe, it, expect, before, after, ioc */

'use strict';

require('../../support');

var Q = require('q');
var mongo = ioc.create('mongo');
var users = ioc.create('repositories/users');
var fixtures = require('../../support/fixtures');

describe('repositories', function() {
  describe('users', function() {
    before(function(done) {
      var records = require('../../fixtures/users');
      fixtures.populate('users', records).nodeify(done);
    });

    after(function(done) {
      fixtures.truncate('users').nodeify(done);
    });

    describe('.getByUsername', function() {
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

    describe('.findByProfession', function() {
      it('filters by profession with asc city order', function(done) {
        users
          .findByProfession('programmer', 1)
          .then(function(users) {
            expect(users.length).to.equal(2);
            expect(users[0].city).to.equal('Los Angeles');
            expect(users[1].city).to.equal('San Francisco');
          })
          .nodeify(done);
      });

      it('filters by profession with desc city order', function(done) {
        users
          .findByProfession('programmer', -1)
          .then(function(users) {
            expect(users.length).to.equal(2);
            expect(users[0].city).to.equal('San Francisco');
            expect(users[1].city).to.equal('Los Angeles');
          })
          .nodeify(done);
      });
    });
  });
});
