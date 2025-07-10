import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import User from './models/user.model.js'
import Order from './models/order.js.js'

// __dirname define karna for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

mongoose.connect(process.env.MONGOURI)
  .then(() => { console.log('MongoDb is Running') })
  .catch(err => console.error('MongoDB connection error:', err))

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/create-order', async (req, res) => {
  let {name , address , number} = req.body

  let CreatOrder = await Order.create({
     name,
    address,
    number,
  })


})

app.post('/sign-up', async (req, res) => {
  let { fname, lname, company, email, country, number, message, img } = req.body
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

app.get('/allusers', async (req, res) => {
  let users = await User.find()
  res.render('allusers', { users })
})

app.get('/delete/:id', async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id })
  res.redirect('/allusers')
})

app.get('/edit/:userid', async (req, res) => {
  let foundUser = await User.findOne({ _id: req.params.userid })
  res.render('edit', { foundUser })
})

app.post('/update/:userid', async (req, res) => {
  let { fname, lname, company, email, country, number, message, img } = req.body
  await User.findOneAndUpdate({ _id: req.params.userid }, { fname, lname, company, email, country, number, message, img })
  res.redirect('/allusers')
})

app.listen(PORT, () => {
  console.log(`Server Is Running On http://localhost:${PORT}`)
})
