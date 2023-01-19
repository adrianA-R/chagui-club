const Joi = require('joi')

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const amount = Joi.number();
const places = Joi.string().max(200);
const image =  Joi.string().uri();

const createGameSchema  =  Joi.object({
	name: name.required(),
	image: image.required()
});

const updateGameSchema  =  Joi.object({
	name: name,
	image: image
});

const  getGameSchema = Joi.object({
	id: id.required()
});

module.exports = { createGameSchema,  updateGameSchema, getGameSchema }