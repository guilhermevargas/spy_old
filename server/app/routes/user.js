const userController    = require('../controllers/user');
const userSchema        = require('../schemas/user');
const socialUserSchema  = require('../schemas/social_user');
const socialMediaSchema = require('../schemas/social_media');
const passport          = require('passport');

const validator        = require('express-joi-validation')({
  passError: true,
});

const path             = '/users';

module.exports = (app) => {
  app.post(`${path}/signup`, validator.body(userSchema), userController.signup);
  app.post(`${path}/socials/signup/`, validator.body(socialUserSchema), userController.socialSignup);

  app.put(`${path}/:id/socials/associate`, passport.authenticate('jwt', { session: false }), validator.body(socialMediaSchema),
    userController.associateSocialMedia);
};
