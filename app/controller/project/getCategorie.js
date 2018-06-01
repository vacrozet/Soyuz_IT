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
    db.collection('Categories').find({}).toArray((err, resultCategorie) => {
      if (err) return response(res, 500, false, 'Internal Server Error')
      return response(res, 200, true, resultCategorie)
    })
  })
}
