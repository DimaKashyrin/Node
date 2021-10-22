const Joi = require('joi');

const { PASSWORD_REGEXP } = require('../configs/constans');

const checkForgotPassword = Joi.object({
  password: Joi
    .string()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required()
});

module.exports = {
  checkForgotPassword
};
