const db = require('../../db')
var generator = require('generate-password')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')

function response (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  console.log(req.body.mail)
  if (req.body.mail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    db.get().then((db) => {
      db.collection('Users').find({mail: req.body.mail}).toArray((err, result) => {
        if (err) return response(res, 204, false, 'Mail incorrect')
        if (result.length === 1) {
          var newPass = 'valentin' //generator.generate({length: 10, uppercase: false, numbers: true})
          nodemailer.createTestAccount((err, account) => {
            if (err) return response(res, 'Mail non envoyé', 500)
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
              from: '"Soyuz Test Send Mail" <projecttestnodemailer@gmail.com>', // sender address
              to: req.body.mail, // list of receivers
              subject: 'Nouveau mot de passe soyuz_IT', // Subject line
              text: 'Nouveau mot de passe soyuz_IT', // plain text body
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
                              <tr><td height='30px'></td></tr>
                              <tr><td align='center'><a href='http://localhost:3000/'><img class='name' src='https://soyuz.digital/wp-content/themes/soyouz2016/images/logo-soyuz.png' alt='SoyuzDigital'></a></td></tr>
                              <tr height='30px;'><td></td></tr>
                              <tr>
                                <td align='center' style='font-size: 22px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Mot de passe oublié ?</td>
                              </tr>
                              <tr height='20px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'> Pas de soucis... Soyuz a tout prévu ;)</td></tr>
                              <tr height='20px;'><td></td></tr>
                              <tr><td align='center' style='font-size: 18px; text-align: center; color: white; font-family: brandon-grotesque, sans-serif;'>Ton nouveau mot de passe :</td></tr>
                              <tr><td align='center' style='font-size: 16px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif;'>${newPass}</td></tr>
                              <tr height='30px;'><td></td></tr>
                              <tr><td align='center' style='text-decoration: none; font-size: 20px; text-align: center; color: #ffcc00; font-family: brandon-grotesque, sans-serif; border-spacing: 10px;'><a href='http://localhost:3000/' style='text-decoration: none; color: #ffcc00; font-size: 30px;'>Soyuz IT</a></td></tr>
                              <tr height='30px;'><td></td></tr>
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
              if (error) {
                console.log(error)
                return response(res, 'Mail was not send', 500)
              }
              db.collection('Users').update({mail: req.body.mail}, {
                $set: {
                  passwd: bcrypt.hashSync(newPass, 10)
                }
              })
              return response(res, 200, true, 'Mail envoyé')
            })
          })
        } else return response(res, 400, false, 'Utilisateur non trouvé')
      })
    })
  } else return response(res, 400, false, "Ceci n'est pas un mail")
}
