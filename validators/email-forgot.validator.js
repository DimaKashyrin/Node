const Joi = require('joi');

const { EMAIL_REGEXP } = require('../configs/constans');

const isValidForgotEmail = Joi.object({
  email: Joi
    .string()
    .regex(EMAIL_REGEXP)
    .trim()
    .required()
});

module.exports = {
  isValidForgotEmail
};
