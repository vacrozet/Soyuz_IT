const db = require('../../db')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 200, false, 'Accès Non Autorisé')
  db.get().then((db) => {
    db.collection('Users').find({}).toArray((error, resultUsers) => {
      if (error) return response(res, 500, false, 'Internal Server Error')
      return response(res, 200, true, resultUsers)
    })
  })
}
