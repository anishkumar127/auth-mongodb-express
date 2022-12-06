const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=> console.log("DB is connected successfully!"))
    .catch((err) => {
      console.log(`DB connection failed ${err}`);
      process.exit(1);
    });
};
