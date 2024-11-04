const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogModel = new Schema({
    title : {
        type : String
    },
    subTitle : {
        type : String
    },
    description : {
        type : String
    },
    image : {
        type : String
    }
},{
    timestamps : true
})

const Blog = mongoose.model("Blog",blogModel);
module.exports = Blog;