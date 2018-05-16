import React, { Component } from 'react'
import { local } from '../utils/api'
import '../css/AddUser.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class AddUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      society: [],
      values: '',
      nom: '',
      prenom: '',
      mail: '',
      poste: ''
    }
  }

  handleChangeSelect = (event, index, values) => this.setState({values})

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSignup () {
    if (this.state.nom !== '' &&
    this.state.prenom !== '' &&
    this.state.mail !== '' &&
    this.state.values !== '') {
      local().post('/user/singup', {
        idSociety: this.state.values,
        mail: this.state.mail,
        prenom: this.state.prenom,
        nom: this.state.nom,
        poste: this.state.poste
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleSignup()
    }
  }

  componentWillMount () {
    local().get('/society/getsociety').then((res) => {
      console.log(res)
      if (res.data.success === true) this.setState({society: res.data.message})
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='bodyAdduser'>
        <div className='formulaire'>
          <Paper style={{padding: 20}} zDepth={5}>
            <form>
              <center>
                <h2><u>Nouvel Utilisateur</u></h2>
              </center><br />
              <SelectField
                multiple={false}
                hintText='Selectionner une Société'
                value={this.state.values}
                fullWidth
                onChange={this.handleChangeSelect}
              >
                {this.state.society ? this.state.society.map((res, index) => {
                  return (<MenuItem key={index} checked={false} value={res._id} primaryText={res.name} />)
                }) : null }
              </SelectField>
              <TextField
                floatingLabelText='Nom'
                name='nom'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Prenom'
                name='prenom'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Mail'
                name='mail'
                fullWidth
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              /><br />
              <TextField
                floatingLabelText='Poste Occupé'
                name='Poste'
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

export default AddUser
