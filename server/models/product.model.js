const mongoose=require('mongoose')
const validator=require('validator')
const prodSchema=new mongoose.Schema({
    prodName:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    specs:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    },
    seller_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sellerEmail:{
        type:String,
        required:true,
        lowercase:true,
    },
    rating:{
        type:Number,
        maxlength:[5]
    }
},{timestamps:true})
const Product=mongoose.model('Product',prodSchema)
module.exports=Product