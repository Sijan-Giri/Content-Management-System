const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');
const Blog = require('./model/blogModel');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDatabase();

app.get("/blogs",async (req,res) => {
    const blog = await Blog.find();
    if(blog.length > 0) {
        res.status(200).json({
            message : "Blog fetched successfully",
            data : blog
        })
    }
    else {
        res.status(404).json({
            message : "No blogs found"
        })
    }
})

app.get("/blogs/:id",async (req,res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if(blog) {
        res.status(200).json({
            message : "Blog fetched successfully",
            data : blog
        })
    }
    else {
        res.status(404).json({
            message : "No Blog found for this id"
        })
    }
})

app.post("/createBlog", async (req,res) => {
    const {title,subTitle,description} = req.body;
    await Blog.create({
        title,
        subTitle,
        description
    })
    res.status(200).json({
        message : "Blog created successfully"
    })
})

app.patch("/blogs/:id",async(req,res) => {
    const id = req.params.id
    const {title,subTitle,description} = req.body;
    await Blog.findByIdAndUpdate(id,{
        title,
        subTitle,
        description
    })
    res.status(200).json({
        message : "Blog updated successfully"
    })
})

app.delete("/blogs/:id",async (req,res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({
        message : "Blog deleted successfully"
    })
})

app.listen(3000,() => {
    console.log("Server is starting...");
})