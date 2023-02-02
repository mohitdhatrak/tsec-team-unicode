const express=require('express')
const app=express()
const Product=require('../models/product.model')
app.use(express.json())
const newProduct=async(req,res)=>{
    const {prodName, brand,userPrice,algoPrice, category,url,yearsUsed}=req.body;
    if(!prodName || !brand || !userPrice || !category || !url || !yearsUsed)
    return res.status(400).json({message:"Please fill the necessary details "})
    const prod=new Product(req.body) 
    try {
        await prod.save()
        await Product.findByIdAndUpdate(prod._id,{sellerEmail:userData.email})
        await Product.findByIdAndUpdate(prod._id,{seller_id:userData._id})
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const updateProd=async(req,res)=>{
    try {
        let data=await Product.findByIdAndUpdate(req.params.id,req.body)
        if(req.userData.email!=data.sellerEmail)
        return res.status(400).json({message:'Unauthorized'})
        res.status(200).json({message:'Updated'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const myProducts=async(req,res)=>{
    try{
        let data=await Product.find({seller_id:req.userData._id})
        res.status(400).json({data})
    }catch(error){
        res.status(400).json({message:error.message})
    }
}
const deleteProd=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Product Deleted'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const products=async(req,res)=>{
    try {
        const data=await Product.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const searchedProduct=async(req,res)=>{
    try {
        const search=req.body
        const data1=await Product.find({prodName:search})
        const data2=await Product.find({brand:search})
        const data3=await Product.find({category:search})
        res.status(200).json({data1,data2,data3})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const particularProduct=async(req,res)=>{
    try {
        const prod=await Product.findById(req.params.id)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const interested=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports={newProduct,updateProd,deleteProd,myProducts,products,searchedProduct,particularProduct}