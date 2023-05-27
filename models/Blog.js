const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const BlogSchema = mongoose.Schema(
  {
    Author: { type: ObjectId, ref: "User" },
    Title: { type: String },
    Content: { type: String },
    BlogCreateDate: { type: Date, default: () => Date.now() },
    BlogUpdateDate: { type: Date, default: () => Date.now() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", BlogSchema);
