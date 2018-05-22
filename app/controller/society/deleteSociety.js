const db = require('../../db')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 400, false, 'Accès non autorisé')
  if (req.params.id !== '') {
    db.get().then((db) => {
      db.collection('Society').deleteOne({_id: req.params.id})
      db.collection('Users').remove({idSociety: req.params.id})
      return response(res, 200, true, 'Société supprimer')
    })
  } else return response(res, 400, false, 'Champ non renseigné')
}
