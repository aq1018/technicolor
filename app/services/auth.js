'use strict';

var bcrypt = require('bcrypt');
var Q = require('q');

// number of bcrypt rounds.
// Higher is more scure but more CPU intensive.
var ROUNDS = 10;

module.exports = function () {
  return {
    passwordMatch: function(hash, password) {
      return Q.ninvoke(bcrypt, 'compare', password, hash);
    },

    encryptPassword: function(password) {
      return Q.ninvoke(bcrypt, 'hash', password, ROUNDS);
    },
  };
};

module.exports['@singleton'] = true;
