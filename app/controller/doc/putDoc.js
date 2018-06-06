const db = require('../../db.js')
const path = require('path')
const fs = require('fs')
const dir = path.dirname(require.main.filename) + '/doc'
var fileExtension = require('file-extension')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log(req.body)
  console.log(req.files)
  console.log(req.file)

  // console.log(req.user.refSociety)
  // console.log(dir)
  // console.log(req.body.test)
  // if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  // if (!fs.existsSync(dir + '/tmp')) fs.mkdirSync(dir + '/tmp')
  // if (!fs.existsSync(dir + '/tmp/' + req.body.refSociety)) fs.mkdirSync(dir + '/tmp/' + req.body.refSociety)
  // if (!fs.existsSync(dir + '/tmp/' + req.body.refSociety + '/' + req.body.ref)) fs.mkdirSync(dir + '/tmp/' + req.body.refSociety + '/' + req.body.ref)
  // var direction = dir + '/tmp/' + req.body.refSociety + '/' + req.body.ref + '/' + req.body.name
  // if (fs.existsSync(direction)) return response(res, 401, false, 'File Already Upload')
  // const extension = fileExtension(req.body.name)
  // console.log(extension)
  // }
  // if (!fs.existsSync(dir + req.user.id)) {
  //   fs.mkdirSync(dir + req.user.id)
  // }
  // let base64Data = req.body.pic.replace(/^data:image\/png;base64,/, '')

  // fs.writeFile(dir + req.user.id + '/' + req.params.id_pict + '.png', base64Data, 'base64', (err) => {
  //   if (err) {
  //     res.status(500)
  //     return res.json({
  //       success: false,
  //       error: 'False picture id',
  //       popularite: req.user.popularite
  //     })
  //   } else {
  //     res.status(200)
  //     return res.json({
  //       success: true,
  //       popularite: req.user.popularite
  //     })
  //   }
  // })
}
