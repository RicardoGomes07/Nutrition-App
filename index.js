const express = require('express'); //Server
const mongoose = require('mongoose'); //DataBase
const bcrypt = require('bcryptjs');
const jsonwebtokn = require('jsonwebtoken')


//importing models
const userModel = require('./models/userModel');
const foodModel = require('./models/foodModel');
const { registerUser, LoginUser } = require('./User');
const { fetchfoods, verifyToken, foodsByName } = require('./Food');

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/Nutrition")
.then(() => {
  console.log("DataBase connected!");
})
.catch((err) => {
  console.log(err);
})

const app = express();

app.use(express.json())

//app routes
app.post("/register", registerUser)
app.post("/login", LoginUser)
app.get("/foods",verifyToken,fetchfoods)
app.get("/foods/:name",verifyToken,foodsByName)




app.listen(8000, ()=>{
  console.log("Server running");
})