const express = require('express')
const router = express.Router()
// const middle = require('../middleware.js')

router.get('/signin', require('../controller/user/signin.js'))

module.exports = router
