const Joi = require('joi');

const {constants:{EMAIL_REGEXP, PASSWORD_REGEXP}} = require('../configs');
const {userRoles} = require('../configs');

const createUserValidator = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(2)
    .max(30)
    .trim()
    .required(),
  email: Joi
    .string().regex(EMAIL_REGEXP)
    .required(),
  role: Joi
    .string()
    .allow(...Object.values(userRoles)),
  password: Joi
    .string()
    .regex(PASSWORD_REGEXP),
  age: Joi
    .number()
});

module.exports = {
  createUserValidator
};
