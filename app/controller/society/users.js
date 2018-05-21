const db = require('../../db')

function response (res, status, bool, message) {
  res.status(status)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.user.admin !== true) return response(res, 404, false, 'Access non authorisé')
  db.collection('Society').find({}).toArray((err, resultSociety) => {
    if (err) return response(res, 500, false, 'Internal Server Error')
    console.log(resultSociety)
    return response(res, 200, true, resultSociety)
  })
}
