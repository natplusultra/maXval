const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  reviewDate: { type: Date },
  quality: { type: Number },
  appeal: { type: Number },
  value: { type: Number },
  ItemId: { type: String },
  reviewer: { type: String },
  notes: { type: String }
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
