/* globals describe, it, expect, ioc */

'use strict';

require('../../support');

var auth = ioc.create('services/auth');

describe('services', function(){
  describe('auth', function() {
    describe('.encryptPassword', function() {
      it('encrypts password into hash', function(done) {
        auth
          .encryptPassword('changeme')
          .then(function(hash) {
            expect(hash).to.exist;
          })
          .nodeify(done);
      });
    });

    describe('.passwordMatch', function() {
      // the original password for this hash is 'changeme'
      var hash = '$2a$10$t2x5pNgPL1RYAKi/pF9Z2eLaoAC.dYRS67LfPfOUMwhnf6GNOiDVq';

      it('returns true with right password', function(done) {
        auth
          .passwordMatch(hash, 'changeme')
          .then(function(isMatch) {
            expect(isMatch).to.equal(true);
          })
          .nodeify(done);
      });

      it('returns false with wrong password', function(done) {
          auth
          .passwordMatch(hash, 'wrong password')
          .then(function(isMatch){
            expect(isMatch).to.equal(false);
          })
          .nodeify(done);
      });
    });
  });
});
