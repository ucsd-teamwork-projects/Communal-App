const router = require("express").Router();
// const bookRoutes = require("./books");
const loginRoutes = require("./login");

// Book routes
// router.use("/books", bookRoutes);

// Login Routes
router.use("/login", loginRoutes);

module.exports = router;
