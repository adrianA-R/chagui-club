const express = require("express");
const indexRouter = require("./index.router");
const gamesRoutes = require("./games.routes.js");
const usersRoutes  = require("./users.routes.js");


const router = express.Router();

function appRoutes(app){
 app.use('/', router);

 router.use('/', indexRouter);
 router.use('/games', gamesRoutes);
 router.use('/users',usersRoutes);
}

module.exports = { appRoutes };