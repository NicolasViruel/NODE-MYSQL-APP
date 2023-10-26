const express = require("express");
const morgan = require("morgan");
const {engine} = require('express-handlebars');
const path = require('path')
const router = require("./routes") //routers
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const passport = require('passport');
const { database } = require('./keys');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port' , process.env.PORT || 4000);
app.set('views', path.join(__dirname,  'views' )); //establezco donde esta la carpeta views

//Public
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({ //configuracion
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') , 'layouts'), //direccion de la carpeta layouts
    partialsDir: path.join(app.get('views') , 'partials'), //direccion de la carpeta partials
    extname: '.hbs', //tenemos que decirle que mis archivos terminaran en .hbs
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); //utilizamos nuestro handlebars


// Middlewares // Conexion de sesiones guardadas en la base de datos
app.use(session({
    secret: 'nodemysqlsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use( (req, res,next) =>{
    app.locals.success = req.flash('success')
    next();
});


//base route path
const apiRoute = process.env.API_URL || '/api';

app.use(apiRoute, router)



//Starting the Server
app.listen(app.get('port') , () =>{
    console.log('Server on port 👾', app.get('port') );
})
