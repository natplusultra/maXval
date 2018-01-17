const router = require("express").Router();
const itemRoutes = require("./item");
const reviewRoutes = require("./review");
const uploadRoutes = require("./upload");
const userRoutes = require("./user");

// Item routes, this matches /api/item
router.use("/item", itemRoutes);

//User routes, this matches /api/user
router.use("/user", userRoutes);

//review routes, this matches /api/review
router.use("/review", reviewRoutes);

// /api/upload
router.use("/upload", uploadRoutes);

module.exports = router;
