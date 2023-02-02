const cookieParser = require('cookie-parser')
const express=require('express')
const morgan=require('morgan')
const user=require('./routes/user.routes')
const app=express()
require('./db/db.connect')
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/user',user)
//app.use('/product',prod)
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
module.exports=app
app.listen(5000,()=>console.log('server listening on 5000'))