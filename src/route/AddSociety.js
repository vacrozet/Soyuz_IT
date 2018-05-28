import React, { Component } from 'react'
import '../css/AddSociety.css'
import { local } from '../utils/api.js'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import store from '../utils/store.js'
import { observer } from 'mobx-react'

@observer
class AddSociety extends Component {
  constructor (props) {
    super(props)
    this.state = {
      libelé: '',
      nameOfSociety: '',
      adress: '',
      nextAdress: '',
      pc: '',
      city: '',
      country: '',
      siret: ''
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleCreateSociety () {
    if (this.state.libelé !== '' &&
      this.state.nameOfSociety !== '' &&
      this.state.adress !== '' &&
      this.state.pc !== '' &&
      this.state.city !== '' &&
      this.state.siret !== '') {
      local().post('/society/create', {
        name: this.state.libelé,
        nameOfSociety: this.state.nameOfSociety,
        adress: this.state.adress,
        suiteAdress: this.state.nextAdress,
        cp: this.state.pc,
        ville: this.state.city,
        pays: this.state.country,
        siret: this.state.siret
      }).then((res) => {
        if (res.data.success === true) {
          store.openDialogInfo(true, 'Success', `${res.data.message}`)
          this.setState({
            libelé: '',
            nameOfSociety: '',
            adress: '',
            nextAdress: '',
            pc: '',
            city: '',
            country: '',
            siret: ''
          })
        }
      }).catch((err) => {
        store.openDialogInfo(true, 'Erreur', `${err.response.data.message}`)
        this.setState({
          libelé: '',
          nameOfSociety: '',
          adress: '',
          nextAdress: '',
          pc: '',
          city: '',
          country: '',
          siret: ''
        })
      })
    }
  }
  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleCreateSociety()
    }
  }

  render () {
    return (
      <div className='bodyAddSociety'>
        <div className='formulaire'>
          <Paper style={{padding: 20}} zDepth={5}>
            <form>
              <center>
                <h2><u>Nouvelle Société</u></h2>
              </center>
              <TextField
                floatingLabelText='Libelé'
                name='libelé'
                fullWidth
                value={this.state.libelé}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Nom société'
                name='nameOfSociety'
                fullWidth
                value={this.state.nameOfSociety}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Adresse'
                name='adress'
                fullWidth
                value={this.state.adress}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Adresse suite'
                name='nextAdress'
                fullWidth
                value={this.state.nextAdress}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Code Postal'
                name='pc'
                fullWidth
                value={this.state.pc}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Ville'
                name='city'
                fullWidth
                value={this.state.city}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Pays'
                name='country'
                fullWidth
                value={this.state.country}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='N* de Siret'
                name='siret'
                fullWidth
                value={this.state.siret}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br /><br />
              <RaisedButton
                label='créer'
                primary
                onClick={this.handleCreateSociety.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
                fullWidth
              />
            </form>
          </Paper>
        </div>
      </div>
    )
  }
}

export default AddSociety
