const router = require("express").Router();
const reviewController = require("../../controllers/reviewController");

// Matches with "/api/review"
router.route("/")
  .get(reviewController.findAll)
  .post(reviewController.create);

// Matches with "/api/review/:id"
router
  .route("/:id")
  .get(reviewController.findById)
  .put(reviewController.update)
  .delete(reviewController.remove);

// Matches with "/api/review/item/:id"
// Use this route if you want to retrieve reviews for a particular Item
router
  .route("/item/:ItemId")
  .get(reviewController.findByItemId)
  .put(reviewController.update)
  .delete(reviewController.remove);

module.exports = router;
