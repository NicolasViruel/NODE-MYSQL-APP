const express = require("express");
const linksControllers = require("../controllers/linkController");
const router = express.Router();

//routes
router.get('/links', linksControllers.getUsers);
//agregamos links
router.post('/links', linksControllers.addLinks);
//mostramos links
router.get('/showlinks', linksControllers.showLinks);

module.exports = router;