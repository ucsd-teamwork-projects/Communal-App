const router = require("express").Router();
const communalController = require("../../controllers/communalController");

// Matches with "/api/communal"
router.route("/")
  .get(communalController.findAll)
  .post(communalController.create)

router.route("/:id")
  .get(communalController.findById)
  .delete(communalController.remove)
  .put(communalController.update)

module.exports = router;
