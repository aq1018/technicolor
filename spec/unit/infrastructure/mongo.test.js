/* globals describe, it, expect, ioc */

'use strict';

require('../helper');

var mongo = ioc.create('mongo');

describe('infrastructure', function(){
  describe('mongo', function() {
    it('works', function(done) {
      mongo.admin().listDatabases(done);
    });
  });
});
