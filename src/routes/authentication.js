const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

//routes
router.get('/singup', authControllers.getUsers);

router.post('/singup', authControllers.createUser);

router.get('/profile', authControllers.profile);

router.get('/singin', authControllers.singinRedirect);

router.post('/singin', authControllers.singin);


module.exports = router;