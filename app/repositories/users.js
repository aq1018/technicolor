'use strict';

var Q = require('q');
var COLLECTION_NAME = 'users';

module.exports = function(mongo) {
  var users = mongo.collection(COLLECTION_NAME);

  function getByUsername(username) {
    return Q.ninvoke(users, 'findOne', {username: username});
  }

  // returns a list of users filtered by profession,
  // and ordered by city.
  // @param profession [String] the profession to filter by
  // @param citySortOrder [1, -1] Ascending / Descending order
  function findByProfession(profession, citySortOrder) {
    var cursor = users.find({profession: profession}, { sort: {city: citySortOrder}});
    return Q.ninvoke(cursor, 'toArray');
  }

  return {
    getByUsername: getByUsername,
    findByProfession: findByProfession
  };
};

module.exports['@require'] = ['mongo'];
module.exports['@singleton'] = true;
