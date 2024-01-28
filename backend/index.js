const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./db/user');
const Blog = require('./db/blogpost');

const app = express();
app.use(cors());
app.use(express.json());

require('./db/config');



app.get("/" , (req , res)=>{
    res.send("First Connection");
})

app.get("/getBlogs" , async (req , res)=>{
    let blogs = await Blog.find().select('-data');

    if(!blogs){
        res.send({error : "No Blogs available"});
    }
    else{
        res.send(blogs);
    }
})

app.get("/bloginfo/:id" , async (req , res)=>{
    let blogs = await Blog.findOne({_id : req.params.id});

    if(!blogs){
        res.send({error : "No Blogs available"});
    }
    else{
        res.send(blogs);
    }
})


app.get('/search/:key' , async (req, res)=>{ 
    let blog = await Blog.find({
        "$or" : [
            { title : {$regex : req.params.key} },
            { user : {$regex : req.params.key} }
        ]
    });

    if(!blog){
         res.send({error : "No Posts Found !"})
      }
    else{
        res.send(blog);
         
    }
})



app.post('/register' , async (req , res)=>{
    let user = await User.findOne({email : req.body.email}).select('-password');
    if (!req.body.name && !req.body.email && !req.body.password) {
        res.send({error : "Fill All Details"});
    }
    else if(user){
        res.send({error : "User Already Exist ! Please Login"});
    }
    else{
        let user = new User(req.body);
        let result = await user.save();
        res.send(result);
        console.log(result);
    }
})

app.post('/login' , async (req , res)=>{
    let user = await User.findOne(req.body).select('-password');
    if(req.body.password && req.body.email){
        if(user){
            res.send(user);
        }
        else{
            res.send({error : "User not Found"});
        }
    }
    else{
        res.send({error : "Fill Complete Details"});
    }
    console.log(user);
})

app.post('/blog' , async (req , res)=>{
    let blog = await Blog.findOne({title : req.body.title});
    if (!req.body.title && !req.body.description && !req.body.data && !req.body.image && req.body.user) {
        res.send({error : "Fill All Details"});
    }
    else if(blog){
        res.send({error : "Blog Already Exist ! Please Add Another"});
    }
    else{
        let blog = new Blog(req.body);
        let result = await blog.save();
        res.send(result);
        console.log(result);

    }
})




app.delete("/delete/:id" , async (req , res)=>{
    
    const result = await Blog.deleteOne({_id : req.params.id});
    res.send(result);
    console.log(result);
})


app.put('/blog/:id' , async (req, res)=>{ 
    const result = await Blog.updateOne(
        {_id : req.params.id},
        {
           "$set" : req.body
        }
        );
    if(!result){
        res.send({error : "Error Updating the Post"})
    }
    else{
        res.send(result);
    }
    
})


app.listen(5000);
