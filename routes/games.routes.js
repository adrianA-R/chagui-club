const express = require("express");
const gameServices = require('../services/games.services');
const validatorHandler = require('../middlewares/validator.handler');
const  { isLoggedIn } = require('../lib/access');
const { createGameSchema, updateGameSchema, getGameSchema } = require('../schemas/game.schema');


const router = express.Router();
const service = new gameServices();

router.get('/', isLoggedIn,
	async (req, res) => {
	const games = await service.find();

	res.status(200).render('games/allGames', { games });
		
});

router.get('/add', isLoggedIn, async (req, res) => {
	res.render('games/add');
});

router.get('/:id', isLoggedIn,
	validatorHandler(getGameSchema, 'params'),
	async (req, res, next) => {
		const validator = req.user.id_role;
		try {
			const { id } = req.params;
			let game = await service.findOne(id);
			res.status(200).render('games/game', { g: game });	
		}
		catch (err) {
			next(err);
		}
	});

router.post('/findGame',
	async (req, res, next) => {
		try{
			const  { name }  = req.body;
			const game = await service.findOne(name);
			res.status(200).render('games/game', { g: game });
		} catch (e) {
			next(e);
		}
		
	});

router.post('/',
	validatorHandler(createGameSchema, 'body'),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newGame = await service.create(body);

			res.status(201).redirect('games');
			console.log("success");
		} catch (e) {
			next(e);
		}
	});

router.get('/modify/:id',
	isLoggedIn,
	async (req, res) => {
		const { id } = req.params;
		const game = await service.findOne(id);
		await res.render('games/modify', { g: game });
	});

router.get('/edit/:id',isLoggedIn,
	validatorHandler(getGameSchema, 'params'),
	validatorHandler(updateGameSchema, 'body'),
	async (req, res) => {
		const { id } = req.params;
		const body = req.body;
		const edit = await service.update(id, body);


		res.status(200).json(edit);
		console.log("success");
	});

router.get('/delete/:id', isLoggedIn,
async (req, res) => {
	//validar el eliminar
	const { id } = req.params;
	const trash = await service.delete(id);
	res.status(200).redirect('/games');
});

module.exports = router;
