const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')

router.post('/createcategorie', middle('USER'), require('../controller/project/createCategorie.js'))
router.get('/getcategorie', middle('USER'), require('../controller/project/getCategorie.js'))
router.get('/getonecategorie/:_id', middle('USER'), require('../controller/project/getOneCategorie.js'))

module.exports = router
