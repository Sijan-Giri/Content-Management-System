const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');
const Blog = require('./model/blogModel');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDatabase();

app.get("/",(req,res) => {
    res.json({
        message : "iam from home page",
        status : 200,
        id : "09348754389"
    })
})

app.post("/createBlog",(req,res) => {
    const {title,subTitle,description} = req.body;
    Blog.create({
        title,
        subTitle,
        description
    })
    res.json({
        status :200,
        message : "yoou are in create blog page"
    })
})


app.listen(3000,() => {
    console.log("Server is starting...");
})