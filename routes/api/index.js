const router = require("express").Router();
const userRoutes = require("./user");
const socialRoutes = require("./social");


// Social routes
router.use("/socials", socialRoutes);
// User routes
router.use("/user", userRoutes);

module.exports = router;
