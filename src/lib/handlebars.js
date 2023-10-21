//configuracion de la biblioteca timeAgo
const {format} = require("timeago.js");

//este sera el objeto utilizado por el componente handlebars.js
const helpers = {};

//este metodo recibe la fecha y la cambia por mi
helpers.timeago = (timestamp) =>{
    //este metodo (format) lo que hace es tomar un timestamp y lo convierte
   return format(timestamp);
};

module.exports = helpers;



