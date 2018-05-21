const db = require('../../db')
const validator = require('validator')
const uuid = require('uuid')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 400, false, 'Accès non autorisé')
  if (req.body.name === '') return response(res, 400, false, 'Nom de group Incorrect')
  if (req.body.nameOfSociety === '') return response(res, 400, false, 'Nom société Incorrect')
  if (req.body.adresse === '') return response(res, 400, false, 'Adresse Incorrect')
  if (!validator.isPostalCode(req.body.cp, 'FR')) return response(res, 400, false, 'Code Postal Incorrect')
  if (!validator.isAlpha(req.body.pays, ['fr-FR'])) return response(res, 400, false, 'Pays Incorrect')
  if (!validator.isLength(req.body.siret, [{min: 14, max: 14}])) return response(res, 400, false, 'N* de siret Incorect')
  if (!validator.isNumeric(req.body.siret)) return response(res, 400, false, 'N* de siret Incorect')
  db.get().then((db) => {
    db.collection('Society').find({siret: req.body.siret}).toArray((err, result) => {
      if (err) return response(res, 500, false, 'Internal Server Erreur')
      if (result.length === 0) {
        let id = uuid()
        let society = {
          _id: id,
          name: req.body.name,
          nameOfSociety: req.body.nameOfSociety,
          adress: req.body.adress,
          next_adress: req.body.suiteAdress,
          pc: req.body.cp,
          city: req.body.ville,
          country: req.body.pays,
          siret: req.body.siret,
          team: []
        }
        db.collection('Society').insert(society, null, (err, result) => {
          if (err) return response(res, 500, false, 'Erreur Ajout Group')
          if (result) return response(res, 200, true, 'Société Ajouté')
        })
      } else return response(res, 400, false, 'Société déjà existante')
    })
  })
}
