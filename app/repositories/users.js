'use strict';

var Q = require('q');
var COLLECTION_NAME = 'users';

module.exports = function(mongo) {
  var users = mongo.collection(COLLECTION_NAME);

  function getByUsername(username) {
    return Q.ninvoke(users, 'findOne', {username: username});
  }

  return {
    getByUsername: getByUsername
  };
};

module.exports['@require'] = ['mongo'];
module.exports['@singleton'] = true;
