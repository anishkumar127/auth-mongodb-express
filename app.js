require("dotenv").config();
const express = require("express");
const app = express();

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
    // 2. all the data should exists
    // 3. check if user already exists
    // 4. encrypt the password
    // 5. save the user in Database
    // 6. generate a token for user and send it.
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
