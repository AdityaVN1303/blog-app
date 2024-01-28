const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://adityanagare09:adityanagare09@cluster0.ac4sq5h.mongodb.net/blog-db?retryWrites=true&w=majority").then((res)=>{
    console.log("Mongo Success");
}).catch((err)=>{
    console.error(err);
})