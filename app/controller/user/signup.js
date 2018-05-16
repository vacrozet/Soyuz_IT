const db = require('../../db')
const validator = require('validator')
const nodemailer = require('nodemailer')
const generator = require('generate-password')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}
 
module.exports = (req, res) => {
  if (!req.body.idSociety.match(/^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i)) return response(res, 400, false, 'id society Incorect')
  if (!validator.isEmail(req.body.mail)) return response(res, 400, false, 'Email incorrect')
  if (!validator.isAlpha(req.body.prenom, ['fr-FR'])) return response(res, 400, false, 'Prenom incorrect')
  req.body.prenom = req.body.prenom[0].toUpperCase() + req.body.prenom.substring(1).toLowerCase()
  if (!validator.isAlpha(req.body.nom, ['fr-FR'])) return response(res, 400, false, 'Nom incorrect')
  req.body.nom = req.body.nom[0].toUpperCase() + req.body.nom.substring(1).toLowerCase()
  var newPass = 'valentin' //generator.generate({length: 10, uppercase: false, numbers: true})
  db.get().then((db) => {
    db.collection('Society').find({_id: req.body.idSociety}).toArray((err, resultSociety) => {
      if (err) return response(res, 500, false, 'Internal Server Erreur')
      if (resultSociety.length !== 1) return response(res, 404, false, 'Société non trouvé')
      resultSociety[0].team.forEach(element => {
        if ((element.prenom === req.body.prenom) && (element.nom === req.body.nom)) return response(res, 403, false, 'Utilisateur déjà présent dans cette société')
      })
      nodemailer.createTestAccount((err, account) => {
        if (err) return response(res, 500, false, 'Mail non envoyé')
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'projecttestnodemailer@gmail.com', // generated ethereal user
            pass: 'soyuzdigital' // generated ethereal password
          }
        })
    
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Soyuz IT" <projecttestnodemailer@gmail.com>', // sender address
          to: req.body.mail, // list of receivers
          subject: 'Inscription Soyuz_IT', // Subject line
          text: 'Inscription Soyuz_IT', // plain text body
          html: `<html>
          <head>
              <meta http-equiv='content-type' content='text/html; charset=utf-8'>
              <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'>
          </head>
          <body leftmargin='0px' topmargin='0px' marginwidth='0px' marginheight='0px'>
            <table bgcolor='#262931' valign='top' height='100%' width='100%' cellpadding='0' cellspacing='0' border='0'>
              <tbody>
              <tr>
                <td>
                  <div>
                      <table bgcolor='#262931' align='center' height='100%' width='100%' cellpadding='0' cellspacing='0' border='0'>
                        <tbody>
                          <tr><td height='60px'></td></tr>
                          <tr><td align='center'><a href='http://localhost:3000/'><img class='name' src='https://soyuz.digital/wp-content/themes/soyouz2016/images/logo-soyuz.png' alt='SoyuzDigital'></a></td></tr>
                          <tr height='30px;'><td></td></tr>
                          <tr>
                            <td align='center' style='font-size: 22px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Bienvenue sur Soyuz IT</td>
                          </tr>
                          <tr height='20px;'><td></td></tr>
                          <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'> Un compte a été créé pour vous</td></tr>
                          <tr height='20px;'><td></td></tr>
                          <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Identifiant:</td></tr>
                          <tr height='5px;'><td></td></tr>
                          <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${req.body.mail}</td></tr>
                          <tr height='10px;'><td></td></tr>
                          <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Password:</td></tr>
                          <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${newPass}</td></tr>
                          <tr height='30px;'><td></td></tr>
                          <tr><td align='center' style='text-decoration: none; font-size: 20px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif; border-spacing: 10px;'><a href='http://localhost:3000/' style='text-decoration: none; color: #ffcc00; font-size: 30px;'>Soyuz IT</a></td></tr>
                          <tr height='60px;'><td></td></tr>
                        </tbody>
                      </table>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </body>
          </html>`
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) return response(res, 500, false, 'Mail was not send')
          let id = uuid()
          let admin = false
          if (resultSociety[0].name.toLowerCase() === 'soyuz') admin = true
          let user = {
            _id: id,
            lock: true,
            block: false,
            admin: admin,
            prenom: req.body,prenom,
            nom: req.body.nom,
            poste: '',
            login: '',
            mail: req.body.mail,
            passwd: bcrypt.hashSync(newPass, 10),
            path: '',
            hash: '',
            lastConnexion: '',
            tokens: []
          }
          db.get().then((db) => {
            db.collection('Society').find({_id: req.body.idSociety}).toArray((err, resultSociety) => {
              if (err) return response(res, 500, false, 'Internal Server Erreur')
              if (resultSociety.length !== 1) return response(res, 404, false, 'Société non trouvé')
              resultSociety[0].team.forEach(element => {
                if ((element.prenom === req.body.prenom) && (element.nom === req.body.nom)) return response(res, 403, false, 'Utilisateur déjà présent dans cette société')
              })
              
            })
          })
      })
      })
    })  
  })
}
