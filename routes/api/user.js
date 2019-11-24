const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user/"
router
.route("/:userEmail/likes")
.put(userController.pushLikes)
.delete(userController.pullLikes)

router
.route("/:userEmail/dislikes")
.put(userController.pushDislikes)
.delete(userController.pullDislikes)

router
.route("/:userEmail/going")
.put(userController.pushGoing)
.delete(userController.pullGoing)

// Matches with "/api/user/:userEmail"
router
.route("/:userEmail")
.get(userController.find)
.put(userController.update)
.delete(userController.delete)

router
  .route("/")
  .post(userController.create)

  
module.exports = router;
