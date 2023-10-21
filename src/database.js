const mysql = require('mysql')
const {database} = require('./keys');
//metodo para poder usar async-await ya que sino tendrias que usar promesas
const {promisify} = require('util');

//nos crea unos hilos que se van ejecuantando y cada uno va a haciendo una tarea en secuencia
//en el caso de tener fallos.
const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if (err) {
        //mandar a cerrar la base de datos
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS LOSED');
        }
        //comprobar cuantas conecciones tiene la base de datos
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        //coneccion rechazada
        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
    //si no tiene ningun error
    if (connection)  connection.release();
    console.log('DB is Connected');
    return;
});
//convertimos promesas lo que antes eran callBacks
pool.query = promisify(pool.query);

module.exports = pool