const express = require("express");
const cors = require("cors");
const {
  signUp,
  login,
  goal,
  exercise,
  breakfast,
  lunch,
  snakes,
  dinner,
  getGoals,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  getBreakfast,
  deleteBreakfast,
  getLunch,
  getSnakes,
  getDinner,
  deleteLunch,
  deleteSnakes,
  deleteDinner,
  updateGoal,
} = require("../controllers/user-controller");
const router = express.Router();
router.use(cors());

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/goal", goal);
router.post("/exercise", exercise);
router.post("/breakfast", breakfast);
router.post("/lunch", lunch);
router.post("/snakes", snakes);
router.post("/dinner", dinner);
router.get("/getGoals", getGoals);
router.get("/workouts", getWorkouts);
router.delete("/deleteworkout", deleteWorkout);
router.put("/updateworkout", updateWorkout);
router.get("/getBreakfast", getBreakfast);
router.get("/getLunch", getLunch);
router.get("/getSnakes", getSnakes);
router.get("/getDinner", getDinner);
router.delete("/deleteBreakfast", deleteBreakfast);
router.delete("/deleteLunch", deleteLunch);
router.delete("/deleteSnakes", deleteSnakes);
router.delete("/deleteDinner", deleteDinner);
router.put("/updateGoal", updateGoal);
module.exports = router;
