var readline = require('readline-sync')
const MongoClient = require('mongodb').MongoClient
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

let usert = false
let pass = false
let prenom = false
let nom = false

console.log('-> Creation de la DB <-')
while (prenom === false) {
  var name = readline.question('Prénom: ')
  if (name !== '') prenom = true
}
while (nom === false) {
  var lastname = readline.question('Nom: ')
  if (lastname !== '') nom = true
}
while (usert === false) {
  var username = readline.question('Mail: ')
  if (username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    usert = true
  }
}

while (pass === false) {
  var password = readline.question('Password: ')
  let tab = password.trim().split(' ')
  if (tab.length === 1) pass = true
}

var hash = bcrypt.hashSync(password, 10)
let id = uuid()
let user = {
  _id: id,
  lock: true,
  block: false,
  admin: true,
  nom: lastname,
  prenom: name,
  mail: username,
  nameSociety: 'Soyuz',
  idSociety: '7d35cdad-830f-4efb-bce2-1cc5d60b019e',
  refSociety: 'SOYUZ',
  poste: '',
  passwd: hash,
  path: '',
  hash: '',
  lastConnexion: '',
  tokens: []
}
let userSociety = {
  _id: id,
  nom: name + ' ' + lastname,
  mail: username,
  poste: ''
}
let société = {
  _id: '7d35cdad-830f-4efb-bce2-1cc5d60b019e',
  name: 'Soyuz',
  nameOfSociety: 'El Sur',
  adress: '102 rue du fbg poissonniere',
  next_adress: '',
  pc: '75010',
  city: 'Paris',
  country: 'France',
  siret: '75332382300025',
  ref: 'SOYUZ',
  team: [userSociety]
}

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
  if (err) { return console.dir(err) }
  var dbase = db.db('soyuz_it')
  dbase.createCollection('Users', () => {
    console.log(`Create Table Users`)
  })
  dbase.collection('Users').insert(user, null, (err, result) => {
    if (err) {
      console.dir(err)
      process.exit()
    } else {
      console.log('User Insert')
    }
  })
  dbase.collection('Society').insert(société, null, (error, resultSociety) => {
    if (error) {
      console.dir(error)
      process.exit()
    } else {
      console.log('Society Insert')
    }
  })
  db.close()
})
