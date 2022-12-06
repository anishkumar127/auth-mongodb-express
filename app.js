require("dotenv").config();
const express = require("express");
const app = express();
const User_DB = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("./model/user");
const cookieParser = require("cookie-parser");
// connect database calling
require("./database/database").connect();

// middleware
app.use(express.json());
app.use(cookieParser());

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
      res.status(400).send("All fields are compulsory!");
    }
    // 3. check if user already exists - email
    const existingUser = await User_DB.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already exists with this email!");
    }
    // 4. encrypt the password
    const myEncryptedPassword = await bcrypt.hash(password, 10);
    // 5. save the user in Database
    const createdUser = await User_DB.create({
      firstName,
      lastName,
      email,
      password: myEncryptedPassword,
    });
    // 6. generate a token for user and send it.
    const token = jwt.sign(
      { id: createdUser._id, email: createdUser.email },
      "jksklslse23", // process.env.jwtsecret
      {
        expiresIn: "2h",
      }
    );
    createdUser.token = token;
    createdUser.password = undefined;

    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // 1. get all data from frontend
    const { email, password } = req.body;
    // validation
    if (!(email && password)) {
      res.status(400).send("both field is required");
    }
    // 2. find user in DB
    const userExists = await User_DB.findOne({ email });

    if (!userExists) {
      res.status(400).send("please provide valid user");
    }
    // 3. match the password
    //   const encryptedPassword = await bcrypt.compare(password,userExists.password);  // we can also do this. if above !userExists condition not done.
    // or we can do like this
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const token = jwt.sign(
        { id: userExists._id },
        "jksklslse23", // process.env.jwtsecret
        {
          expiresIn: "2h",
        }
      );
      userExists.token = token;
      userExists.password = undefined;

      // 4. send a token in userExists cookie
      // cookie Section
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        userExists,
      });
      //   res.status(201).json(userExists); no use now.
    }

    // send a token
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
