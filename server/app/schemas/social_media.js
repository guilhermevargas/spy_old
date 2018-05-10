const Joi = require('joi');

const schema = Joi.object({
  accessToken: Joi.string().required(),
  type: Joi.string().allow('FACEBOOK', 'TWITTER').required(),
});

module.exports = schema;
