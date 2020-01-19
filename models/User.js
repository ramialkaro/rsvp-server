// to start create user 

const mongoose = require('mongoose');

// we need to cretae schema for creating the user 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',userSchema)