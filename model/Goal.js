const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: { type: String },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
});

module.exports = mongoose.model("Goal", goalSchema);
