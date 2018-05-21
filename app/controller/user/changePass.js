const db = require('../../db')
const bcrypt = require('bcryptjs')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}
module.exports = (req, res) => {
  if (!req.body.oldPass) return response(res, 200, false, 'Champ non rempli')
  if (!req.body.newPass) return response(res, 200, false, 'Champ non rempli')
  if (!req.body.newPass1) return response(res, 200, false, 'Champ non rempli')
  if (req.body.oldPass === req.body.newPass) return response(res, 200, false, 'Mot de passe identique')
  if (req.body.oldPass === req.body.newPass1) return response(res, 200, false, 'Mot de passe identique')
  if (req.body.newPass !== req.body.newPass1) return response(res, 200, false, 'Mot de passe différent')
  db.get().then((db) => {
    db.collection('Users').update({mail: req.user.mail}, {
      $set: {
        passwd: bcrypt.hashSync(req.body.newPass, 10)
      }
    })
    return response(res, 200, true, 'Mot de passe changé')
  })
}
