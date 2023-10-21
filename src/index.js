const express = require("express");
const morgan = require("morgan");
const {engine} = require('express-handlebars');
const path = require('path')
const router = require("./routes") //routers
//Initializations
const app = express();

//Settings
app.set('port' , process.env.PORT || 4000);
app.set('views', path.join(__dirname,  'views' )); //establezco donde esta la carpeta views

//Public
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))

app.engine('.hbs', engine({ //configuracion
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views') , 'layouts'), //direccion de la carpeta layouts
    partialsDir: path.join(app.get('views') , 'partials'), //direccion de la carpeta partials
    extname: '.hbs', //tenemos que decirle que mis archivos terminaran en .hbs
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); //utilizamos nuestro handlebars

////configure url-json
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global Variables


//Routes
// app.use(require('./routes'))

//base route path
const apiRoute = process.env.API_URL || '/api';

app.use(apiRoute, router)



//Starting the Server
app.listen(app.get('port') , () =>{
    console.log('Server on port 👾', app.get('port') );
})
