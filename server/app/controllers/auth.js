const authService  = require('../services/auth');
const tokenHandler = require('../services/token_handler');
const User         = require('../models/user');

module.exports = {
  authenticate: (req, res, next) => {
    authService.authenticate(req, res, next);
  },

  me: (req, res) => {
    const token = authService.getAuthorization(req.headers);

    if (token) {
      const decoded = tokenHandler.decode(token);

      User.findOne({
        email: decoded.email,
      }, (err, user) => {
        if (err) throw err;

        if (!user) {
          res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          res.json({ success: true, msg: `Welcome in the member area  ${user.firstName}!` });
        }
      });
    } else {
      res.status(403).send({ success: false, msg: 'No token provided.' });
    }
  },
};

