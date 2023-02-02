const mongoose=require('mongoose')
const interestedSchema=new mongoose.Schema({
    user_id1:mongoose.Types.ObjectId,
    product_id1:mongoose.Types.ObjectId,
    user_id2:mongoose.Types.ObjectId,
    product_id2:mongoose.Types.ObjectId
})
const interested=require('Matched',interestedSchema)
module.exports=interested