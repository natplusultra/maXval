const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  img: { type: String},
  dateUploaded: { type: Date, default: Date.now },
  description: { type: String },
  name: { type: String },
  location: { type: String },
  ownerId: { type: String }
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
