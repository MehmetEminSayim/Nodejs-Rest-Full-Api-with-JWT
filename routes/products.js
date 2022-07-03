const express = require("express")
const Product = require("../models/Product")

const router = express.Router();

router.get("/",(req,res)=>{
    Product.find().then((result)=>{
        res.json(result)
    })
})

router.get("/:id",(req,res)=>{
   Product.findById(req.params.id).then((result)=>{
        res.json(result)
   })
})

router.post("/",(req,res)=>{
    //create product
    console.log(req.userID);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        userId:req.userID
    });
    product.save();
    res.json(product)
    
})

router.put("/:id",(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }).then((result)=>{
        res.json(result)
    })
})

router.delete("/:id",(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then((result)=>{
        res.json(result)
    })
})

module.exports = router;