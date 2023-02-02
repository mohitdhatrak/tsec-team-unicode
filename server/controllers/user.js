const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express()
const User=require('../models/user.model')
const nodemailer=require('nodemailer')
app.use(express.json())
const generateOtp=require('../utils/otp')
var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'try.user99@gmail.com',
        pass:'zrzoezntywioiuea'
    }
})
const SecretKey="qwertyuv"
//const geocoder_provider=mapquest
const geocoder_api_key="iafUd3hVTZW6XvicVgbG2y7s29mHvN1S"
const newUser=async(req,res)=>{
    const {username, password, email, BuildingNo,area,city, mobile}=req.body;
    if(!username || !password || !email || !BuildingNo || !area || !city || !mobile )
    return res.status(400).json({message:"Please fill the necessary details "})
    const user=new User(req.body)
    try {
        await user.save()
        var mailOptions={
            from:'try.user99@gmail.com',
            to:req.body.email,
            subject:'Succesfully Registered',
            text:'Your account has been created successfully , Enjoy shopping !!!'
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            }
          });
        res.json({message:'Success'}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}
const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    return res.status(400).json({error:'Please Fill the Details'})
    try {
            const userData=await User.findOne({email:req.body.email})
            if(!userData)
            return res.status(400).json({error:'User not found'})
            const validPassword=await bcrypt.compare(req.body.password,userData.password)
            if(!userData || !validPassword)
            res.status(400).json({message:'Invalid credentials'})
            else
            {
               const token=jwt.sign({email:req.body.email},SecretKey,{expiresIn:'1d'})
               userData.tokens=userData.tokens.concat({token})
               await userData.save()
                return res.status(200).json({token:token,userData})
            }

    } catch (error) {
        res.status(404).json({message:error.message})
    } 
}
const forgotPass=async(req,res)=>{
    const {email}=req.body
    if(!req.body.email)
    return res.status(400).json({message:'Please provide registered emailId'})
    try {
        const userData=await User.findOne({email:req.body.email})
        if(!userData)
        return res.status(400).json({message:'no user found'})
        const otp=generateOtp()
        await User.findByIdAndUpdate(userData._id,{otp:otp})
        var mailOptions={
            from:'try.user99@gmail.com',
            to:userData.email,
            subject:'OTP for your account at Thrarther',
            text:`OTP to reset password is ${otp}`
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            }
          });
          res.status(200).json({message:'OTP sent on registered email'})
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const verifyOtp=async(req,res)=>{
    try{
    const {otp,email}=req.body
    const userData=await User.findOne({email:email})
    if(!otp)
    res.status(400).json({error:'pls enter otp!!!'})
    else if(otp==userData.otp)
    {
        userData.password=""
        return res.status(200).json({message:'otp verified'})
    }
    else
    {
        return res.status(400).json({message:'invalid otp'})
    }
    }catch(err){
        res.status(400).json({message:err.message})
    }
}
const newPass=async(req,res)=>{
    try
    {
    const {password,cpassword,email}=req.body
    const userData=await User.findOne({email:email})
    if(!password || !cpassword)
    return res.status(400).json({message:'pls enter details'})
    if(password!=cpassword)
    return res.status(400).json({message:'password and confirm password dont match'})
    userData.password=password
    await userData.save()
    res.status(200).json({success:'password updated'})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}
module.exports={
    newUser,
    userLogin,
    forgotPass,
    verifyOtp,
    newPass
}