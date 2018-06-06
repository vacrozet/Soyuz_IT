const express = require('express')
const router = express.Router()
const middle = require('../middleware.js')
const multer = require('multer')
const upload = multer({dest: 'doc/'})

router.post('/putdoc', middle('USER'), upload.single('file'), require('../controller/doc/putDoc.js'))

module.exports = router
