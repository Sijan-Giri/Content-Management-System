const express = require('express');
const app = express();
const { connectDatabase } = require('./database/database');
const Blog = require('./model/blogModel');
const cors = require("cors");
const {storage , multer} = require("./middleware/multerConfig");
const upload = multer({storage : storage})
const fs = require("fs")

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : true}));

connectDatabase();

app.get("/blogs",async(req,res) => {
    const blog = await Blog.find();
    if(blog.length > 0) {
        res.status(200).json({
            message : "Blogs fetched successfully",
            data : blog
        })
    }
    else {
        res.status(404).json({
            message : "No blogs found"
        })
    }
})

app.get("/blogs/:id",async(req,res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(404).json({
            message : "Please provide id"
        })
    }
    const blog = await Blog.findById(id);
    if(blog) {
        res.status(200).json({
            message : "Single Blog fetched successfully",
            data : blog
        })
    }
    else {
        res.status(404).json({
            message : "No Blog found for this id"
        })
    }
})

app.post("/createBlog",upload.single("image"), async(req,res) => {
    const {title,subTitle,description} = req.body;
    let filename;
    if(req.file) {
        filename = `http://localhost:3000/${req.file.filename}`
    }
    await Blog.create({
        title,
        subTitle,
        description,
        image : filename
    })
    res.status(200).json({
        message : "Blog created successfully"
    })
})

app.patch("/blogs/:id",upload.single("image"),async(req,res) => {
    const id = req.params.id
    const {title,subTitle,description} = req.body;
    const blog = await Blog.findById(id);
    if(req.file) {
        const oldImageUrl = blog.image;
        const localhostLength = "http://localhost:3000/".length;
        const currentImageUrl = oldImageUrl.slice(localhostLength);
        fs.unlink(`./storage/${currentImageUrl}`,(err) => {
            if(err) {
                console.log("Something went wrong",err);
            }
            else {
                console.log("File deleted successfully");
            }
        })
    }
    await Blog.findByIdAndUpdate(id,{
        title,
        subTitle,
        description,
        image : `http://localhost:3000/${req.file.filename}`
    })
    res.status(200).json({
        message : "Blog updated successfully"
    })
})

app.delete("/blogs/:id",async(req,res) => {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if(!blog) {
        return res.status(404).json({
            message : "Blog not found"
        })
    }
    if(blog.image) {
        const oldImageUrl = blog.image;
        const localhostLength = "http://localhost:3000/".length;
        const currentImageUrl = oldImageUrl.slice(localhostLength);
        fs.unlink(`./storage/${currentImageUrl}`,(err) => {
            if(err) {
                console.log("Something went wrong",err)
            }
            else {
                console.log("File deleted successfully")
            }
        })
    }
    res.status(200).json({
        message : "Blog deleted successfully"
    })
})

app.listen(3000,() => {
    console.log("Server is starting...");
})