const router = require("express").Router();
const socialController = require("../../controllers/socialController");

// Matches with "/api/socials"
router.route("/")
  .get(socialController.findAll)

router.route("/:id/going")
  .put(socialController.pushGoing)

module.exports = router;
