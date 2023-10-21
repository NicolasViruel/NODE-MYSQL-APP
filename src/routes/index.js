const router = require("express").Router();

//import Routers
const usersRoutes = require("./users");
const authRoutes = require("./authentication");
const linkRoutes = require("./links");

//users
router.use("/", usersRoutes);

//Auth
router.use("/", authRoutes);

//Links
router.use("/", linkRoutes);



module.exports = router