const Joi = require('joi');

const checkUserName = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(2)
    .max(30)
    .trim()
    .required()
});

module.exports = {
  checkUserName
};

