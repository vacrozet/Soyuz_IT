const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.post('/resetpassword', require('../controller/user/resetPass.js'))

module.exports = router
