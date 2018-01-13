const router = require("express").Router();
const uploadController = require("../../controllers/uploadController");
const path = require("path");
const fs = require('fs');
const multer = require('multer');

// Matches with "/api/upload"
router.route("/")
  //.get(uploadController.findAll)
  .post(uploadController.create);

module.exports = router;