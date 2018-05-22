const db = require('../../db')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 200, false, 'Accès non autorisé')
  db.get().then((db) => {
    db.collection('Society').find({_id: req.params.idSociety}).toArray((err, resultSociety) => {
      if (err) return response(res, 500, false, 'Internal Server Error')
      if (resultSociety.length === 1) return response(res, 200, true, resultSociety)
      else return response(res, 404, false, 'Society not found')
    })
  })
}
