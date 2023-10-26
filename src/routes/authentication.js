const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

//routes
router.get('/singup', authControllers.getUsers);

router.post('/singup', authControllers.createUser);

router.get('/profile', authControllers.profile);


module.exports = router;