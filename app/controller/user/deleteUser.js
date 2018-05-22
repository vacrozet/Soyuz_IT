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
    db.collection('Users').remove({_id: req.params.id})
    db.collection('Society').update({_id: req.params.idSociety}, {
      $pull: {team: {_id: req.params.id}}
    })
  })
  return response(res, 200, true, 'Success')
}
