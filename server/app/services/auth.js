const User         = require('../models/user');
const tokenHandler = require('./token_handler');
const mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  authenticate: (req, res) => User.findOne({ email: req.body.email }).exec()
    .then((user) => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          this.setToken(res, user);
          res.status(200).send('You successfully authenticated!');
        } else {
          res.status(401).send('Unauthorized!');
        }
      });
    }),

  addAuthotization: (res, user) => {
    this.setToken(res, user);
  },

  getAuthorization: (headers) => {
    if (headers && headers.authorization) {
      const parted = headers.authorization.split(' ');

      if (parted.length === 2) {
        return parted[1];
      }
      return null;
    }
    return null;
  },

  setToken: (res, user) => {
    if (!user) {
      res.status(401).send('Authentication failed. User not found.');
    }

    const token = tokenHandler.encode(user);

    console.log(`token ${token}`);

    res.set('Authorization', `JWT ${token}`);
    res.set('Access-control-expose-headers', 'Authorization');
    res.set('content-type', 'application/json; charset=utf-8');
  },
};
