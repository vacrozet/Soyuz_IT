const db = require('../../db')
const validator = require('validator')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 401, false, 'Accès Non Autorisé')
  if (req.body.name === '') return response(res, 400, false, 'Nom de group Incorrect')
  if (req.body.nameOfSociety === '') return response(res, 400, false, 'Nom société Incorrect')
  if (!validator.isLength(req.body.siret, [{min: 14, max: 14}])) return response(res, 400, false, 'N* de siret Incorect')
  db.get().then((db) => {
    db.collection('Society').update({_id: req.body.idSociety}, {
      $set: {
        name: req.body.name,
        nameOfSociety: req.body.nameOfSociety,
        adress: req.body.adress,
        next_adress: req.body.nextAdress,
        pc: req.body.pc,
        city: req.body.city,
        country: req.body.country,
        siret: req.body.siret
      }
    })
    return response(res, 200, true, 'Succès')
  })
}
