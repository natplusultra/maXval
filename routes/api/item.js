const router = require("express").Router();
const itemController = require("../../controllers/itemController");

// Matches with "/api/item"
router.route("/")
  .get(itemController.findAll)
  .post(itemController.create);

// Matches with "/api/item/:id"
router
  .route("/:id")
  .get(itemController.findById)
  .put(itemController.update)
  .delete(itemController.remove);

// Matches with "/api/item/owner/:id"
// Use this route if you want to retrieve reviews for a particular Item
router
  .route("/owner/:ownerId")
  .get(itemController.findByOwner)
  .put(itemController.update)
  .delete(itemController.remove);

module.exports = router;
