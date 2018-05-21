const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))
router.post('/resetpassword', require('../controller/user/resetPass.js'))
router.post('/signup', middle('USER'), require('../controller/user/signup.js'))
router.get('/info', middle('USER'), require('../controller/user/info.js'))
router.post('/modify', middle('USER'), require('../controller/user/modify.js'))
router.post('/changepass', middle('USER'), require('../controller/user/changePass.js'))
router.get('/allusers', middle('USER'), require('../controller/user/allUser.js'))
router.delete('/delete/:id', middle('USER'), require('../controller/user/deleteUser.js'))

module.exports = router
