const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true,min:3,max:255},
    email:{type:String,required:true,min:3,max:255,unique:true},
    password:{type:String,required:true,min:4,max:1024},
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("User",UserSchema)