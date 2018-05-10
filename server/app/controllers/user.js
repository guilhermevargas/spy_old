const userService        = require('../services/user');
const facebookClient     = require('../client/facebook');
const socialMediaService = require('../services/social_media');

const DuplicatedData     = require('../erros/duplicated_data');

const newUser = userData => ({
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  password: userData.password,
  socialMedia: [],
});

const newSocialMedia = userData => ({
  accessToken: userData.accessToken,
  type: userData.socialType,
});

module.exports = {
  signup: (req, res, next) => {
    const userData = req.body;

    const user = newUser(userData);

    userService.findOneByEmail(user)
      .then((existentUser) => {
        if (existentUser) {
          throw new DuplicatedData('Email have already in use');
        }

        return userService.create(user);
      })
      .then(() => res.status(201).send('User created.'))
      .catch(next);
  },

  socialSignup: (req, res, next) => {
    const userData = req.body;

    const user = newUser(userData);
    const socialMedia = newSocialMedia(userData);

    userService.findOneByEmail(user.email)
      .then((existentUser) => {
        if (existentUser) {
          throw new DuplicatedData('Email have already in use');
        }

        return facebookClient.debug(socialMedia.accessToken)
          .then(fbResp => socialMediaService.findOne(fbResp.data.user_id))
          .then((existentSocialMedia) => {
            if (existentSocialMedia) {
              throw new DuplicatedData('SocialMedia already in use to another account.');
            }

            return socialMediaService.create(socialMedia);
          });
      })
      .then(() => res.status(201).send('User created by facebook.'))
      .catch(next);
  },

  associateSocialMedia: (req, res, next) => {
    const accessToken = req.body.accessToken;
    const mediaType   = req.body.type;
    const userId      = req.params.id;

    userService.findOneById(userId)
      .then(user => facebookClient.debug(accessToken)
        .then((fbResp) => {
          const socialMedia = {
            accessToken,
            userId: fbResp.data.user_id,
            expiresAt: fbResp.data.expires_at,
            type: mediaType,
          };

          return socialMediaService.create(socialMedia)
            .then((s) => {
              user.socialMedias.push(s);
              return user.save();
            });
        }))
      .then(() => res.status(200).send('You successfully associated.'))
      .catch(next);
  },
};

