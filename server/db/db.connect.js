const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const db="mongodb+srv://unicode:unitsec@cluster0.jkz6enf.mongodb.net/db?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser:true,
   // useCreateIndex:true,
    useUnifiedTopology:true,
    //useFindAndModify:false
}).then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>console.log('no connection'));