const router = require("express").Router();
const socialController = require("../../controllers/socialController");

router.route("/:id/going")
  .put(socialController.pushGoing)
  .delete(socialController.pullGoing)

router.route("/:id/comment")
.put(socialController.pushComment)

router.route("/:id")
  .get(socialController.findOne)
  .delete(socialController.remove)


// Matches with "/api/socials"  
router.route("/")
  .get(socialController.findAll)
  .post(socialController.create)
  

module.exports = router;
