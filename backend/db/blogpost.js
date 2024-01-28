const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : String ,
    description : String ,
    data : String ,
    image : String,
    user : String
})

module.exports = mongoose.model("blogs" , blogSchema);