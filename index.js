const express = require("express");
const { engine } = require("express-handlebars")  
const routes = require("./routes");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
const session = require('express-session');
var roleDefault = 1;

const { database } = require('./lib/keys');
require('./lib/passport');


const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler.js");

const app = express();
app.set('port', process.env.PORT || 3030);

//midddlewares

//lectura de json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//motor de vistas  handlebars
app.engine('.hbs',engine(
	{
		defaultLayout: 'main', 
  		layoutsDir: path.join(app.get('views'), 'layouts'),
  		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		helpers: './schemas/handlebars'
	}
));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// configuracion de passport
app.use(session({
	secret: 'OsoFrontino',
	resave: false,
	saveUninitialized: false,
	store: new MySqlStore(database)
}));
app.use(flash());
app.use(passport.initialize()); // inicializa el modulo de autenticacion
app.use(passport.session()); // modifica los dato req del usuario para la deserializacion del usuario


//variables globales
app.use((req,res,next)=> {
	req.roleDefault = roleDefault;
	app.locals.message = req.flash("message");
	app.locals.success = req.flash("success");
	app.locals.user = req.user;
	next();
})


// Public
app.use(express.static(__dirname + '/public'));


//rutas
routes.appRoutes(app);

//middlewares de error
app.use(logErrors);
app.use(boomErrorHandler); 
app.use(errorHandler);
//app.use(flashMessages.init);

//Subida de servidor
app.listen(app.get('port'),()=>{
	console.log("Aplicación corriendo en el puerto",app.get('port'))
});

