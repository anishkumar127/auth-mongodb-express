require("dotenv").config();
const express = require("express");
const app = express();
const User_DB = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// connect database calling
require("./database/database").connect();

// middleware
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("hello is it running see it now");
});

app.post("/register", async (req, res) => {
  try {
    // steps
    // 1. get all data from body
    const { firstName, lastName, email, password } = req.body;
    // 2. all the data should exists
    if (!(firstName && lastName && email && password)) {
      res.statusCode(400).send("All fields are compulsory!");
    }
    // 3. check if user already exists - email
    const existingUser = await User_DB.findOne({ email });
    if (existingUser) {
      res.statusCode(401).send("User already exists with this email!");
    }
    // 4. encrypt the password
    const myEncryptedPassword = await bcrypt.hash(password, 10);
    // 5. save the user in Database
    const createdUser = await User_DB.create({
      firstName,
      lastName,
      email,
      password,
    });

    // 6. generate a token for user and send it.
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
