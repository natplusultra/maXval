const db = require("../models/");
const path = require("path");
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
  destination:'./client/public/uploads',
  filename(req, file, cb) {
    console.log(file)
    cb(null, 'file.originalname'+ Date.now());
  },
});

const upload = multer({ storage });

// Defining methods for the item
module.exports = {
  create: function(req, res) {
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..
    console.log(meta)
    console.log(file)
  },
  
};
