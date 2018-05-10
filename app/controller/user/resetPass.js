const db = require('../../db')

function erreur (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  // console.log(req.body.params)
  if (req.body.params.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    db.get().then((db) => {
      db.collection('Users').find({mail: req.body.params.mail}).toArray((err, result) => {
        if (err) return erreur(res, 204, false, 'Mail incorrect')
        if (result.length === 1) {
          console.log(result)
        }
      })
    })
  }
}
