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
  if (!validator.isEmail(req.body.mail)) return response(res, 200, false, 'Adresse Mail Incorrect')
  if (req.user.mail !== req.body.mail) {
    db.get().then((db) => {
      db.collection('Users').find({mail: req.body.mail}).toArray((err, resultMail) => {
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
        db.collection('Society').find({_id: req.user.idSociety}).toArray((error, resultSociety) => {
          if (error) return response(res, 500, false, 'Internal server error')
          resultSociety[0].team.forEach(element => {
            if (element.mail === req.user.mail) {
              element.nom = req.body.prenom + ' ' + req.body.nom
              element.poste = req.body.poste
              element.mail = req.body.mail
            }
          })
          db.collection('Society').update({_id: req.user.idSociety}, {
            $set: {team: resultSociety[0].team}
          })
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
      db.collection('Society').find({_id: req.user.idSociety}).toArray((error, resultSociety) => {
        if (error) return response(res, 500, false, 'Internal server error')
        resultSociety[0].team.forEach(element => {
          if (element.mail === req.user.mail) {
            element.nom = req.body.prenom + ' ' + req.body.nom
            element.poste = req.body.poste
          }
        })
        db.collection('Society').update({_id: req.user.idSociety}, {
          $set: {team: resultSociety[0].team}
        })
      })
      return response(res, 200, true, 'Modification Accepté')
    })
  }
}
