const router = require("express").Router();
const socialController = require("../../controllers/socialController");

// Matches with "/api/socials"
router.route("/")
  .get(socialController.findAll)

module.exports = router;
