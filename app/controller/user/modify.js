const db = require('../../db')
const validator = require('validator')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log(req.user)
  console.log(req.body)
  if (!validator.isEmail(req.body.mail)) return response(res, 200, false, 'Adresse Mail Incorrect')
  if (req.user.mail !== req.body.mail) {
    db.get().then((db) => {
      db.collection('Users').fnd({mail: req.body.mail}).toArray((err, resultMail) => {
        if (err) return response(res, 500, false, 'Internal server error')
        if (resultMail.length === 1) return response(res, 200, false, 'Mail déjà eistant')
        db.collection('Users').update({mail: req.user.mail}, {
          $set: {
            mail: req.body.mail,
            prenom: req.body.prenom,
            nom: req.body.nom,
            poste: req.body.poste
          }
        })
        return response(res, 200, true, 'Modification Accepté')
      })
    })
  } else {
    db.get().then((db) => {
      db.collection('Users').update({mail: req.body.mail}, {
        $set: {
          prenom: req.body.prenom,
          nom: req.body.nom,
          poste: req.body.poste
        }
      })
      return response(res, 200, true, 'Modification Accepté')
    })
  }
}
