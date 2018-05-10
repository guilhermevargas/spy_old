const SocialMedia    = require('../models/social_media');
const mongoose       = require('mongoose');

mongoose.Promise = require('bluebird');

class SocialMediaService {
  static create(newSocialMedia) {
    return new SocialMedia(newSocialMedia).save();
  }

  static findOne(userId) {
    return SocialMedia.findOne({ userId });
  }
}

module.exports = new SocialMediaService();
