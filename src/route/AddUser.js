import React, { Component } from 'react'
import { local } from '../utils/api'
import '../css/AddUser.css'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RefreshIndicator from 'material-ui/RefreshIndicator'

import store from '../store.js'
import { observer } from 'mobx-react'

@observer
class AddUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      society: [],
      values: '',
      nom: '',
      prenom: '',
      mail: '',
      poste: '',
      loading: false
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
      this.setState({loading: true})
      local().post('/user/signup', {
        idSociety: this.state.values,
        mail: this.state.mail,
        prenom: this.state.prenom,
        nom: this.state.nom,
        poste: this.state.poste
      }).then((res) => {
        if (res.data.success === true) {
          store.openDialogInfo(true, 'Success', res.data.message)
          this.setState({
            values: '',
            nom: '',
            prenom: '',
            mail: '',
            poste: '',
            loading: false
          })
        } else {
          store.openDialogInfo(true, 'Erreur', res.data.message)
          this.setState({loading: false})
        }
      }).catch((err) => {
        console.log(err.response)
        store.openDialogInfo(true, 'Erreur', err.response)
        this.setState({loading: false})
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
      if (res.data.success === true) this.setState({society: res.data.message})
    }).catch((err) => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div className='bodyAdduser'>
        <div className='formulaire'>
          <Paper style={{padding: 20}} zDepth={5}>
              {this.state.loading? (
                <RefreshIndicator
                size={50}
                left={0}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                style={{position: 'relative', marginLeft: '45%'}}
                />
              ) :
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
                  floatingLabelText='Mail'
                  name='mail'
                  fullWidth
                  value={this.state.mail}
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                /><br />
                <TextField
                  floatingLabelText='Poste Occupé'
                  name='poste'
                  fullWidth
                  value={this.state.poste}
                  onChange={this.handleChange.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                /><br /><br />
                <RaisedButton
                  label='créer'
                  primary
                  onClick={this.handleSignup.bind(this)}
                  onKeyPress={this.handleKeyPress.bind(this)}
                  fullWidth
                />
              </form>
              }
          </Paper>
        </div>
      </div>
    )
  }
}

export default AddUser
