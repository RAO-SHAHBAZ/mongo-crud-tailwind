import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import User from './models/user.model.js'


mongoose.connect(process.env.MONGOURI)
.then(()=>{console.log('MongoDb is Running')})

const app = express()
const PORT = process.env.PORT

app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views');
 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})


app.post('/sign-up',async (req,res)=>{
    let {fname,lname,company,email,country,number,message,img}= req.body
    let createdUser = await User.create({
        fname,
        lname,
        company,
        number,
        message,
        country,
        email,
        img,
    })
    res.redirect('/allusers')

})



app.get('/allusers' ,async (req,res)=>{
    let users =await User.find()
    // res.json(users)
    res.render('allusers' , {users})
})


app.get('/delete/:id', async(req,res)=>{
    let deleteduser = await User.findOneAndDelete({_id : req.params.id})
    res.redirect('/allusers')

})
app.get('/edit/:userid', async(req,res)=>{
    let foundUser = await User.findOne({_id : req.params.userid})
    res.render('edit' , {foundUser})

})
app.post('/update/:userid', async(req,res)=>{
    let {fname,lname,company,email,country,number,message,img}= req.body
    await User.findOneAndUpdate({_id : req.params.userid},{fname,lname,company,email,country,number,message,img})
    res.redirect('/allusers')

})

app.listen(PORT,()=>{
    console.log(`Sever Is Running On http://localhost:${PORT}`)
})