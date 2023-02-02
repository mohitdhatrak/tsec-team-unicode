const express=require('express')
const app=express()
const Product=require('../models/product.model')
app.use(express.json())
const newProduct=async(req,res)=>{
    const {prodName, brand, model, price, category, specs,seller,sellerEmail,rating}=req.body;
    if(!prodId || !prodName || !brand || !model|| !price || !category|| !specs || !seller || !sellerEmail || !quantity)
    return res.status(400).json({error:"Please fill the necessary details "})
    const sellerData=await User.findOne({email:sellerEmail})
    if(!sellerData)
    return res.status(400).json({error:'Invalid credentials'})
    const prod=new Product(req.body) 
    try {
        await prod.save()
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}