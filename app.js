require('dotenv').config();
const express = require('express');
const app = express();


// home route
app.get("/",(req,res)=>{
    res.send("hello is it running see it now");
})


module.exports = app