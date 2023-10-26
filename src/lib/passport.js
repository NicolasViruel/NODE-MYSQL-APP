const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

// passport.use('local.singup' , new LocalStrategy({

// }));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, username, password, done) => {
    //asi se trae otro dato en caso de necesitar como el fullname
    const { fullname } = req.body

    const newUser = {
        username: username,
        password: password,
        fullname: fullname
    };
    //antes de guardar voy a utilizar mi metodo Helpers y encriptar el password
    newUser.password = await helpers.encryptPassword(password);

    //ahora necesito guardar ese nuevo usuario en la base de datos
    const result = await pool.query('INSERT INTO users SET ?' , [newUser] );
    //lo selecciono con el insertId que le genera la base de datos
    newUser.id = result.insertId;
    //ahora le indico a donde continua y devuelvo el newUser para que lo guarde en una sesion
    return done(null, newUser);
}));


//aca guarda un usuario en una sesion
passport.serializeUser(( user, done) =>{
    done(null, user.id);
});

//con este metodo deserealizamos el usuario de la sesion
passport.deserializeUser(async (id, done) =>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?' , [id]);
    done(null, rows[0]);
});
