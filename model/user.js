const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null;
    }
    ,
    email: {
        type: String,
        required: true["email is required"],
    },
    password: {
        type: String,
    },
    // TODO: do on letter on.
    token: {
        type: String,
        default: null,
    }
})

module.exports = mongoose.model("user", userSchema);