const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/create', middle('USER'), require('../controller/society/createSociety.js'))
router.get('/getsociety', middle('USER'), require('../controller/society/getSociety.js'))
// router.get('/users', middle('USER'), require('../controller/society/users.js'))

module.exports = router
