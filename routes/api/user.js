const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user/"
router
  .route("/")
  .post(userController.create)

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.find)
  .put(userController.update)
  .delete(userController.delete)

router
  .route("/:id/likes")
  .put(userController.pushLikes)
  .delete(userController.pullLikes)

router
  .route("/:id/dislikes")
  .put(userController.pushDislikes)
  .delete(userController.pullDislikes)

module.exports = router;
