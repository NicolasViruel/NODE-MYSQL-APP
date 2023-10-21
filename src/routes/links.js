const express = require("express");
const linksControllers = require("../controllers/linkController");
const router = express.Router();

//routes
router.get('/links', linksControllers.getUsers);
//agregamos links
router.post('/links', linksControllers.addLinks);
//mostramos links
router.get('/showlinks', linksControllers.showLinks);
//eliminamos links
router.get('/:id', linksControllers.deleteLinks);
//editar links
router.get('/edit/:id', linksControllers.updateLink);
//ruta ya editado
router.post('/edit/:id', linksControllers.newLink)

module.exports = router;