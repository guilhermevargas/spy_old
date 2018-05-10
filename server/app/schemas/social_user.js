const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  passwordConfirmation: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  accessToken: [Joi.string(), Joi.number()],
  email: Joi.string().email().required(),
  type: Joi.string().allow('FACEBOOK'),
});

module.exports = schema;
