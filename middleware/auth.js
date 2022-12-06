const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // grab token from cookie
  console.log(req.cookies);
  const { token } = req.cookies;
  // if no token , stop there,
  if (!token) {
    res.status(403).send("Please login first!");
  }
  // decode that token and get id
  try {
    const decode = jwt.verify(token, "jksklslse23");
    req.user = decode;
    console.log(decode);
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid Token");
  }
  // query to DB for that user id
  return next();
};

module.exports = auth;
