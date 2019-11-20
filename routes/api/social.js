const router = require("express").Router();
const socialController = require("../../controllers/socialController");

// Matches with "/api/socials"
router.route("/")
  .get(socialController.findAll)

  router.route("/:id")
  .get(socialController.findOne)

router.route("/:id/going")
  .put(socialController.pushGoing)
  .delete(socialController.pullGoing)

router.route("/:id/comment")
  .put(socialController.pushComment)

module.exports = router;
