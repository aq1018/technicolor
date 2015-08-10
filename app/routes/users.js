'use strict';

module.exports = function (users) {
  // This endpoint returns a list of users filtered by `profession`
  // ordered by `citysort`.
  function findUsers(req, res, next) {
    var profession = req.query.profession;
    var citysort = req.query.citysort || '1';

    // validate profession
    if(!profession) {
      res.send(400, {error: 'query `profession` must be supplied.'});
      return next();
    }

    // validate citysort
    if(citysort !== '1' && citysort !== '-1') {
      res.send(400, {error: 'query `citysort` must be either 1 or -1.'});
      return next();
    }

    // execute query
    users
      .findByProfession(profession, parseInt(citysort))
      .then(function (users) {
        res.send({users: users});
      })
      .nodeify(next);
  }

  return findUsers;
};

module.exports['@require'] = ['repositories/users'];
module.exports['@singleton'] = true;
