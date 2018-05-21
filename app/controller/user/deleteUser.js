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
  let tab = req.params.id.split(',')
  db.get().then((db) => {
    db.collection('Users').remove({_id: {$in: tab}})
  })
}
