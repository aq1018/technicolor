'use strict';

module.exports = function (users, auth) {
  // WARNING: VERY INSECURE!!! DO NOT USE THIS!!!
  //
  // This endpoint accepts a JSON request formatted below and returns a JSON
  // response indicating if the user is authenticated.
  //
  // Example Request:
  //   {
  //     "username": "<username>",
  //     "password": "<password>"
  //    }
  //
  // Example Response:
  //   {
  //     "authenticated": true
  //   }
  //
  function authenticateUser(req, res, next) {
    users

      // get the user from db based on supplied user name
      .getByUsername(req.params.username)

      // authenticate user returns true / false
      .then(function (user) {
        if(!user) { return false; }
        return auth.passwordMatch(user.passwordHash, req.params.password);
      })

      // render json response
      .then(function(authenticated) {
        res.send({authenticated: authenticated});
      })

      // error handling and promise chain termination
      .nodeify(next);
  }

  return authenticateUser;
};

module.exports['@require'] = ['repositories/users', 'services/auth'];
module.exports['@singleton'] = true;
