const router = require("express").Router();
// const bookRoutes = require("./books");
const userRoutes = require("./user");

// Book routes
// router.use("/books", bookRoutes);

// Login Routes
router.use("/user", userRoutes);

module.exports = router;
