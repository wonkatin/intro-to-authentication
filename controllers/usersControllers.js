const router = require('express').Router()
const db = require('../models')

router.get('/new', (req, res) => {
    res.render('users/new')
})

router.post('/', async (req, res)=> {
    const newUser = await db.user.create({
        email: req.body.email,
        password: req.body.password
    })
    res.cookie('userId', newUser.id)
    // console.log(newUser)
    res.redirect('/')
})

module.exports = router