const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();

const verifyUser = async (userId) => {
  const response = await User.find({ _id: userId });
  if (response[0]?._id) {
    return true;
  } else {
    return false;
  }
};

const verifyToken = (req, res, next) => {
  try {
    if (req.path === "/signUp" || req.path === "/login") {
      next();
    } else {
      const userToken = req.headers.auth;
      const decode = jwt.verify(userToken, process.env.JWT);
      req.user = decode;
      const userId = decode.id;
      verifyUser(userId).then((response) => {
        if (response) {
          next();
        } else {
          res.send("You are not authenticated");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  verifyToken,
};
