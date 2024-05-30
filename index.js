const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();



app.get("/", (req, res) => {
  res.send("Hello fitness lover");
});

//Database connection
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connected to DB"))

app.listen(9090, () => {
  console.log("Listening to Port 9090");
});
