const router = require("express").Router();
// const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
// router.route("/login")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

router.route("/user")
    .get(userController.findUserByName)
    .post(userController.createUser);

module.exports = router;
