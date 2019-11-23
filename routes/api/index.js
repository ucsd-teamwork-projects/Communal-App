const router = require("express").Router();
const userRoutes = require("./user");
const socialRoutes = require("./social");
const communalRoutes = require("./communal");


// Social routes
router.use("/socials", socialRoutes);
// User routes
router.use("/user", userRoutes);
// Communal routes
router.use("/communal", communalRoutes)

module.exports = router;
