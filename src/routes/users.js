const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

//routes
router.get('/', userControllers.getUsers);

module.exports = router;