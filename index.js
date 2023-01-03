const express = require("express");
const { engine } = require("express-handlebars")  
const routes = require("./routes");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const flashMessages = require('flash-messages');
const { library, icon } = ('@fortawesome/fontawesome-svg-core')

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler.js");

const app = express();
app.set('port', process.env.PORT || 3000);


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


// Public
app.use(express.static(__dirname + '/public'));


//rutas
routes.appRoutes(app);

//middlewares de error
app.use(logErrors);
app.use(boomErrorHandler); 
app.use(errorHandler);
app.use(flashMessages.init);

//Subida de servidor
app.listen(app.get('port'),()=>{
	console.log("Aplicación corriendo en el puerto",app.get('port'))
});

