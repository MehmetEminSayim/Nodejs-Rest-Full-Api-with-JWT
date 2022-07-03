const express = require("express");
const User = require("../models/User")
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const registerSchema = Joi.object({
    name:Joi.string().required().min(3).max(255),
    email:Joi.string().required().min(3).email().max(255),
    password :Joi.string().required().min(4).max(255),
})

const router = express.Router();

router.post("/register",(req,res)=>{
    const {error} =  registerSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt)

    const user = new User({ ...req.body, password:hash})
    user.save().then((user)=>{
        const token = jwt.sign({_id:user._id},process.env.JWT_CODE)
        res.header({"Authorization":token}).json({accesToken:token,"user":user})
    }).catch((err)=>{10
        res.json(err)
    })
    
})

router.post("/login",(req,res)=>{

    const { email,password } = req.body;

    User.findOne({ email }).then((user)=>{
        if(!user){
            res.status(400).send("Invalid email or password")
            return;
        }
        const isValid = bcrypt.compareSync(password,user.password)
        if(!isValid){
            res.status(400).send("Invalid email or password")
            return;
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_CODE)
        res.header({"Authorization":token}).json({accesToken:token})

    }).catch((err)=>{
        res.status(400).send("Invalid email or password")
    })
})

module.exports = router;