const db = require('../../db')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log('je passe ici')
  db.get().then((db) => {
    db.collection('Users').find({idSociety: req.user.idSociety}).toArray((err, resultUsers) => {
      if (err) return response(res, 500, false, 'Internal Server Error')
      const result = resultUsers.filter(resultUsers => resultUsers.mail !== req.user.mail)
      return response(res, 200, true, result)
    })
  })
}
