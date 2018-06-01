const db = require('../../db')
const uuid = require('uuid')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.nom === '') return response(res, 404, false, 'Not Authorisation')
  db.get().then((db) => {
    db.collection('Categories').find({nom: req.body.nom}).toArray((err, resultCategorie) => {
      if (err) return response(res, 500, false, 'Internal Server Error')
      let newCat = {
        _id: uuid(),
        nom: req.body.nom,
        idSociety: req.user.idSociety,
        project: []
      }
      console.log(newCat)
      db.collection('Categories').insert(newCat, null, (err1, result) => {
        if (err1) return response(res, 500, false, 'Internal Server Error')
        if (result.result.ok !== 1) return response(res, 500, false, 'Internal Server Error')
        return response(res, 200, true, 'Catégorie créer')
      })
    })
  })
}
