const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/create', middle('USER'), require('../controller/society/createSociety.js'))
router.get('/getsociety', middle('USER'), require('../controller/society/getSociety.js'))
router.get('/allsociety', middle('USER'), require('../controller/society/allSociety.js'))
router.delete('/delete/:id', middle('USER'), require('../controller/society/deleteSociety.js'))

module.exports = router
