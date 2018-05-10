const mongoose       = require('mongoose');
const User           = require('../models/user');

mongoose.Promise = require('bluebird');

class UserService {
  static create(user) {
    return new User(user).save();
  }

  static findOneByEmail({ email }) {
    return User.findOne({ email }).exec();
  }

  static findOneById(id) {
    return User.findOne({ _id: id }).exec();
  }

  associateSocialMedia(userId, socialMedia) {
    return this.findOneById(userId)
      .then((user) => {
        user.socialMedias.push(socialMedia);

        return user.save();
      });
  }
}

module.exports = new UserService();
