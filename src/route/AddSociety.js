import React, { Component } from 'react'
import '../css/AddSociety.css'
import { local } from '../utils/api.js'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

class AddSociety extends Component {
  constructor (props) {
    super(props)
    this.state = {
      libelé: '',
      nameOfSociety: '',
      adress: '',
      nextAdress: '',
      cp: '',
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
      local().post('/society/createSociety', {
        name: this.state.libelé,
        nameOfSociety: this.state.nameOfSociety,
        adress: this.state.adress,
        suiteAdress: this.state.nextAdress,
        cp: this.state.cp,
        ville: this.state.city,
        pays: this.state.country,
        siret: this.state.siret
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleCreateSociety()
    }
  }

  componentWillMount () {
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
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Nom société'
                name='nameOfSociety'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Adresse'
                name='adress'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Adresse suite'
                name='nextAdress'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Code Postal'
                name='cp'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Ville'
                name='city'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Pays'
                name='country'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='N* de Siret'
                name='siret'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br /><br />
              <RaisedButton
                label='créer'
                primary
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
