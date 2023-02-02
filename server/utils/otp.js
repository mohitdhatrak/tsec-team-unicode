const nodemailer=require('nodemailer')
const dotenv=require('dotenv').config()
//console.log(process.env.email)
function generateOtp(){
    let otp
    otp=Math.floor(Math.random()*10000)
    return otp
}

module.exports=generateOtp