const db = require('../../db')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  // if (req.user.admin !== true) return response(res, 401, 'Acces non autorisé')
  db.get().then((db) => {
    db.collection('Group').find().toArray((err, result) => {
      if (err) return response(res, 500, false, 'Internal Server Erreur')
      if (result.length !== 0) {
        result.forEach(element => {
          delete element.nameOfSociety
          delete element.adress
          delete element.next_adress
          delete element.pc
          delete element.city
          delete element.country
          delete element.siret
          delete element.team
        })
        return response(res, 200, true, result)
      } else return response(res, 200, false, 'Aucune société')
    })
  })
}