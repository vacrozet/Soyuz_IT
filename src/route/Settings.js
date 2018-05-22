import React, { Component } from 'react'
import { local } from '../utils/api'
import '../css/Settings.css'
import validator from 'validator'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import store from '../utils/store.js'
import { observer } from 'mobx-react'

@observer
class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prenom: '',
      nom: '',
      poste: '',
      mail: ''
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleModify () {
    if (validator.isEmail(this.state.mail)) {
      local().post('/user/modify', {
        mail: this.state.mail,
        prenom: this.state.prenom,
        nom: this.state.nom,
        poste: this.state.poste
      }).then((res) => {
        if (res.data.success === true) store.openDialogInfo(true, 'Accepté', res.data.message)
      }).catch((err) => {
        store.openDialogInfo(true, 'Erreur', err.response.message)
      })
    }
  }
  
  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleModify()
    }
  }

  componentWillMount () {
    local().get('/user/info').then((res) => {
      if (res.data.success === true) this.setState({
        prenom: res.data.message.prenom,
        nom: res.data.message.nom,
        poste: res.data.message.poste,
        mail: res.data.message.mail
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='bodySettings'>
        <div className='formulaire'>
          <form>
            <center><h2><u>Préférences</u></h2></center>
            <TextField
              floatingLabelText='Mail'
              name='mail'
              fullWidth
              type='mail'
              value={this.state.mail}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            /><br />
            <TextField
              floatingLabelText='Prenom'
              name='prenom'
              fullWidth
              value={this.state.prenom}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            /><br />
            <TextField
              floatingLabelText='Nom'
              name='nom'
              fullWidth
              value={this.state.nom}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            /><br />
            <TextField
              floatingLabelText='Poste'
              name='poste'
              fullWidth
              value={this.state.poste}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            /><br /><br />
            <RaisedButton
              label='Modifier'
              primary
              onClick={this.handleModify.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              fullWidth
            />
          </form>
        </div>
      </div>
    )
  }
}

export default Settings
