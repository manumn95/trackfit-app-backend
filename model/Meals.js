const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const breakfastSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dishName: { type: String },
  calories: { type: Number },
});

const lunchSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dishName: { type: String },
  calories: { type: Number },
});

const snakesSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dishName: { type: String },
  calories: { type: Number },
});

const dinnerSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dishName: { type: String },
  calories: { type: Number },
});

const breakfastModel = mongoose.model("Breakfast", breakfastSchema);
const lunchModel = mongoose.model("Lunch", lunchSchema);
const snakesModel = mongoose.model("Snakes", snakesSchema);
const dinnerModel = mongoose.model("Dinner", dinnerSchema);
module.exports={
  breakfastModel,
  lunchModel,
  snakesModel,
  dinnerModel
}