const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30)
    .required(),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  passwordConfirmation: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: Joi.string().email().required(),
});

module.exports = schema;
