const passport = require('passport');

const getUsers= (req, res) => {
    res.render('auth/singup');
};

const createUser = (req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/api/profile',
        failureRedirect: '/api/signup',
        failureFlash: true
    })(req, res, next);
};

const profile = (req, res) =>{
    res.send("profile")
};


module.exports= {
    getUsers,
    createUser,
    profile,
}