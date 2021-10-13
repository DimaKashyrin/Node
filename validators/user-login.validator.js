const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constans');

const checkLoginFields = Joi.object({
  email: Joi
    .string()
    .regex(EMAIL_REGEXP)
    .trim()
    .required(),
  password: Joi
    .string()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required()
});

module.exports = {
  checkLoginFields
};
