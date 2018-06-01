const db = require('../../db')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  db.get().then((db) => {
    db.collection('Categories').find({_id: req.params._id}).toArray((err, result) => {
      if (err) return response(res, 500, false, 'Internal Server Error')
      if (result.length === 1) return response(res, 200, true, 'Categorie excistante')
      else return response(res, 404, false, 'Not found')
    })
  })
}
