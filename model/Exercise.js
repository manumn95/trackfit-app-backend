const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exerciseName:{type:String},
  date:{type:String},
  duration:{type:String},
  sets:{type:Number},
  steps:{type:Number},
  caloriesBurned:{type:Number}
})

module.exports = mongoose.model("Exercise",exerciseSchema);