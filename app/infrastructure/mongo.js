'use strict';

var mongo = require('mongoskin');

module.exports = function() {
  return mongo.db(process.env.MONGO_URL, {native_parser:true});
};

module.exports['@singleton'] = true;
