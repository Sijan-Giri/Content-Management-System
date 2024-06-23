const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');

connectDatabase();

app.get("/",(req,res) => {
    res.json({
        message : "iam from home page",
        status : 200,
        id : "09348754389"
    })
})

app.get('/contact' , (req,res) => {
    res.send("hi iam contact");
})

app.listen(3000,() => {
    console.log("Server is starting...");
})