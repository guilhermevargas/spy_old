const authController = require('../controllers/auth');
const passport       = require('passport');

const authPath = '/auth';

module.exports = (app) => {
  app.post(`${authPath}/auth/signin`, authController.authenticate);
  app.get(`${authPath}/me`, passport.authenticate('jwt', { session: false }), authController.me);
};
