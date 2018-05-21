const db = require('../../db')
const bcrypt = require('bcryptjs')

function erreur (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}
function genToken () {
  var str = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`
  var token = ''
  for (var count = 0; count < 128; count++) {
    token += str[Math.floor((Math.random() * str.length))]
  }
  return (token)
}

module.exports = (req, res) => {
  if (req.query.mail === undefined) return erreur(res, 400, false, 'login incorrect')
  db.get().then((db) => {
    db.collection('Users').find({mail: req.query.mail}).toArray((error, results) => {
      if (error) return erreur(res, 500, false, 'Internal server error')
      if (results.length !== 1) return erreur(res, 404, false, 'User not found', 'mail')
      if (!bcrypt.compareSync(req.query.password, results[0].passwd)) return erreur(res, 404, false, 'Mot de passe incorrect', 'password')
      let objToken = {}
      objToken.token = genToken()
      objToken.created_at = new Date().getTime()
      results[0].tokens.push(objToken)
      let time = Math.round(Date.now() / 100)
      db.collection('Users').updateOne({mail: req.query.mail}, {
        $set: {tokens: results[0].tokens, lastConnexion: time}
      }).then((res1) => {
        return res.json({
          success: true,
          message: 'Connexion reussie',
          lock: results[0].lock,
          token: objToken.token
        })
      }).catch((err1) => { return erreur(res, 409, false, 'erreur requete') })
    })
  })
}
