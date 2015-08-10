/* global ioc */

'use strict';

// other support functions
var Q = require('q');
var mongo = ioc.create('mongo');

// load fixtures in bulk
function populate(collectionName, records) {
  var coll = mongo.collection(collectionName);
  var inserts = records.map(function(record) {
    return Q.ninvoke(coll, 'insert', record);
  });

  return Q.all(inserts);
}

// truncate collection
function truncate(collectionName) {
  return Q.ninvoke(mongo.collection(collectionName), 'remove');
}

module.exports = {
  populate: populate,
  truncate: truncate
};
