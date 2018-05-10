const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const SocialMediaSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  type: {
    enum: ['FACEBOOK', 'TWITTER', 'INSTAGRAM'],
    required: true,
    type: String,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('SocialMedia', SocialMediaSchema);
