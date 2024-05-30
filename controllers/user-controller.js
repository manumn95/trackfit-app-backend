const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const dotenv = require("dotenv");
const Goal = require("../model/Goal");
const Exercise = require("../model/Exercise");
const {
  dinnerModel,
  snakesModel,
  lunchModel,
  breakfastModel,
} = require("../model/Meals");
const { use } = require("../routes/user-routes");

const data = dotenv.config();

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const dbres = await User.find({ email });
  try {
    if (dbres?.length) {
      return res.json({ message: "Email Already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 0);
    const response = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: response[0]?._id }, data.parsed.JWT, {
      expiresIn: "9999 years",
    });
    return res.json({
      message: "Account Created Successfully",
      response,
      token,
    });
  } catch (error) {
    res.send(error.message);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const dbRes = await User.find({ email: username });
    if (dbRes?.length) {
      const isPasswordValid = await bcrypt.compare(password, dbRes[0].password);
      if (!isPasswordValid) {
        return res.json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: dbRes[0]?._id }, data.parsed.JWT, {
        expiresIn: "9999 years",
      });
      res.json({
        message: "Successfully LoggedIn",
        dbRes,
        username: dbRes[0].email,
        name: dbRes[0].username,
        token,
      });
    } else {
      res.send("No User Found,please Sign Up");
    }
  } catch (error) {
    console.log("error");
  }
};

const goal = async (req, res, next) => {
  const { radioGroup, age, height, weight, genderGroup } = req.body;
  try {
    const userId = req?.user?.id;
    const response = await Goal.create({
      user: userId,
      goal: radioGroup,
      age,
      height,
      weight,
      gender: genderGroup,
    });
    res.send(response);
  } catch (error) {
    res.status(400);
  }
};

const exercise = async (req, res, next) => {
  const { exercisename, date, duration, sets, steps, calories } = req.body;

  try {
    const userId = req?.user?.id;
    const response = await Exercise.create({
      user: userId,
      exerciseName: exercisename,
      date,
      duration,
      sets,
      steps,
      caloriesBurned: calories,
    });
    if (response) {
      res.status(200).json({ message: "Exercise Added Successfully" });
    }
  } catch (error) {
    res.send("error");
  }
};

const breakfast = async (req, res, next) => {
  const { dishName, calories } = req.body;
  try {
    const userId = req?.user?.id;
    const response = await breakfastModel.create({
      user: userId,
      dishName,
      calories,
    });
    if (response) {
      res.json({ message: "Breakfast Added" });
    }
  } catch (error) {
    res.send(error);
  }
};

const lunch = async (req, res, next) => {
  const { dishName, calories } = req.body;
  try {
    const userId = req?.user?.id;
    const response = await lunchModel.create({
      user: userId,
      dishName,
      calories,
    });
    if (response) {
      res.json({ message: "Lunch Added" });
    }
  } catch (error) {
    res.send(error);
  }
};

const snakes = async (req, res, next) => {
  const { dishName, calories } = req.body;
  try {
    const userId = req?.user?.id;
    const response = await snakesModel.create({
      user: userId,
      dishName,
      calories,
    });
    if (response) {
      res.json({ message: "Snakes Added" });
    }
  } catch (error) {
    res.send(error);
  }
};

const dinner = async (req, res, next) => {
  const { dishName, calories } = req.body;
  try {
    const userId = req?.user?.id;
    const response = await dinnerModel.create({
      user: userId,
      dishName,
      calories,
    });
    if (response) {
      res.json({ message: "Dinner Added" });
    }
  } catch (error) {
    res.send(error);
  }
};

//get Requests
const getGoals = async (req, res, next) => {
  try {
    const dbRes = await Goal.find({ user: req.user.id });
    if (dbRes) {
      res.send(dbRes);
    }
  } catch (error) {
    res.send(error.message);
  }
};

//get workouts

const getWorkouts = async (req, res, next) => {
  try {
    const dbRes = await Exercise.find({ user: req.user.id });
    if (dbRes) {
      res.send(dbRes);
    }
  } catch (error) {
    res.send(error);
  }
};

//update Workout

const updateWorkout = async (req, res, next) => {
  const { id } = req.query;
  const { exercisename, date, duration, sets, steps, calories } = req.body;

  if (id) {
    try {
      const userId = req?.user?.id;
      const response = await Exercise.findOneAndUpdate(
        { _id: id, user: userId },
        {
          exerciseName: exercisename,
          date,
          duration,
          sets,
          steps,
          caloriesBurned: calories,
        },
        { new: true }
      );

      if (response) {
        res.send("Update Success");
      } else {
        res.status(404).send("Exercise not found or not authorized to update");
      }
    } catch (error) {
      next(error); // pass the error to the next middleware
    }
  } else {
    res.status(400).send("Missing exercise ID");
  }
};

//delete the workout
const deleteWorkout = async (req, res, next) => {
  const { id } = req.query;
  try {
    const response = await Exercise.findByIdAndDelete({ _id: id });
    if (response) {
      res.send("Deleted Success");
    }
  } catch (error) {
    res.send(error);
  }
};

//get breakfast
const getBreakfast = async (req, res) => {
  try {
    const response = await breakfastModel.find({ user: req.user.id });
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
};

//delete breakfast

const deleteBreakfast = async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const response = await breakfastModel.findByIdAndDelete({ _id: id });
      if (response) {
        res.send("Breakfast Deleted Success");
      }
    } catch (error) {
      res.send(error);
    }
  }
};

//get Lunch
const getLunch = async (req, res) => {
  try {
    const response = await lunchModel.find({ user: req.user.id });
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
};

//get Snakes
const getSnakes = async (req, res) => {
  try {
    const response = await snakesModel.find({ user: req.user.id });
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
};

//get Dinner

const getDinner = async (req, res) => {
  try {
    const response = await dinnerModel.find({ user: req.user.id });
    if (response) {
      res.send(response);
    }
  } catch (error) {
    res.send(error);
  }
};

//delete Lunch
const deleteLunch = async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const response = await lunchModel.findByIdAndDelete({ _id: id });
      if (response) {
        res.send("Lunch Deleted Success");
      }
    } catch (error) {
      res.send(error);
    }
  }
};

//delete snakes
const deleteSnakes = async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const response = await snakesModel.findByIdAndDelete({ _id: id });
      if (response) {
        res.send("Breakfast Deleted Success");
      }
    } catch (error) {
      res.send(error);
    }
  }
};

//delete Dinner
const deleteDinner = async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const response = await dinnerModel.findByIdAndDelete({ _id: id });
      if (response) {
        res.send("Breakfast Deleted Success");
      }
    } catch (error) {
      res.send(error);
    }
  }
};

//delete goal

const updateGoal = async (req, res, next) => {
  const { radioGroup, age, height, weight, genderGroup } = req.body;
  const response = await Goal.findOneAndUpdate(
    { user: req.user.id },
    {
      user: req.user.id,
      goal: radioGroup,
      age,
      height,
      weight,
      gender: genderGroup,
    }
  );
  if (response) {
    res.send("Goal Added");
  }
};

exports.signUp = signUp;
exports.login = login;
exports.goal = goal;
exports.exercise = exercise;
exports.breakfast = breakfast;
exports.lunch = lunch;
exports.snakes = snakes;
exports.dinner = dinner;
exports.getGoals = getGoals;
exports.getWorkouts = getWorkouts;
exports.deleteWorkout = deleteWorkout;
exports.updateWorkout = updateWorkout;
exports.getBreakfast = getBreakfast;
exports.deleteBreakfast = deleteBreakfast;
exports.getLunch = getLunch;
exports.deleteLunch = deleteLunch;
exports.deleteSnakes = deleteSnakes;
exports.deleteDinner = deleteDinner;
exports.getSnakes = getSnakes;
exports.getDinner = getDinner;
exports.updateGoal = updateGoal;
