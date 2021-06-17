const { Joi } = require('express-validation');

module.exports = {
  login: {
    body: Joi.object({
      email: Joi.string().min(6).max(255).required()
        .email(),
      password: Joi.string().min(6).max(1024).required(),
    }),
  },

  register: {
    body: Joi.object({
      firstName: Joi.string().alphanum().min(2).max(30)
        .required(),
      lastName: Joi.string().alphanum().min(2).max(30)
        .required(),
      phone: Joi.number().integer().required(),
      email: Joi.string().email().min(6).max(255)
        .required(),
      password: Joi.string().min(6).max(1024).required(),
    }),
  },
};