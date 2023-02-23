const Joi = require('joi');

const username = Joi.string().alphanum().min(4).max(20);
const password = Joi.string().min(8).max(12);
const firstName = Joi.string();
const lastName = Joi.string();
const phone_number = Joi.number().min(7);
const email = Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const newUserSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    username: username.required(),
    password: password.required(),
    phone_number: phone_number,
    email: email.required()
});

const loginSchema = Joi.object({
    username: username.required(),
    password: password.required()
});

module.exports = { newUserSchema, loginSchema };