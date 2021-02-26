require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
// const axios = require('axios')
const db = require('./models')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')

const app = express()
const PORT = process.env.PORT || 3000

// middleware
const rowdyRes = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(methodOverride('_method'))
// app.use(require('express-ejs-layouts'))
app.use(require('morgan')('tiny'))
// app.use(require('morgan')('dev'))
app.use(cookieParser())
app.use(async (req, res, next) => {

  // const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, 'super secret string')
  // const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)
  // const user = await db.user.findByPk(decryptedIdString)
  const user = await db.user.findByPk(req.cookies.userId)

  res.locals.user = user
  next()
})

app.use('/users', require('./controllers/usersControllers'))

// routes
app.get('/', async (req, res) => {
  // console.log(res.user)
  res.render('index')
})

app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})