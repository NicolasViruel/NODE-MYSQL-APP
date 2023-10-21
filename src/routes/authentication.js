const express = require("express");
const authControllers = require("../controllers/authController");
const router = express.Router();

//routes
router.get('/', authControllers.getUsers);

module.exports = router;