const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.post('/resetpassword', require('../controller/user/resetPass.js'))
router.post('/signup', require('../controller/user/signup.js'))
router.get('/info', middle('USER'), require('../controller/user/info.js'))
router.post('/modify', middle('USER'), require('../controller/user/modify.js'))

module.exports = router
