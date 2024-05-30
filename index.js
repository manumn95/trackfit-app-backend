const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const router = require("./routes/user-routes");
const { verifyToken } = require("./middleware/verifyToken");

const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello fitness lover");
});

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.use("/api", verifyToken, router);

//Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"));

app.listen(9090, () => {
  console.log("Listening to Port 9090");
});
