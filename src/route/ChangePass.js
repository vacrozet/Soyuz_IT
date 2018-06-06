import React, { Component } from 'react'
import '../css/ChangePass.css'
import { local } from '../utils/api'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import store from '../utils/store.js'
import { observer } from 'mobx-react'

@observer
class ChangePass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldPass: '',
      newPass: '',
      newPass1: ''
    }
  }
  handleChange (evt) { this.setState({[evt.target.name]: evt.target.value}) }
  handleKeyPress (evt) { if (evt.key === 'Enter') { this.handleCahngePass() } }
  
  handleCahngePass () {
    if (this.state.oldPass !== '' &&
    this.state.newPass !== '' &&
    this.state.newPass1 !== '' &&
    this.state.newPass === this.state.newPass1 &&
    this.state.newPass !== this.state.oldPass &&
    this.state.newPass1 !== this.state.oldPass) {
      local().post('/user/changepass', {
        oldPass: this.state.oldPass,
        newPass: this.state.newPass,
        newPass1: this.state.newPass1
      }).then((res) => {
        if (res.data.success === true) store.openDialogInfo(true, 'Success', res.data.message)
        else store.openDialogInfo(true, 'Erreur', res.data.message)
        this.setState({
          oldPass: '',
          newPass: '',
          newPass1: ''
        })
      }).catch((err) => {
        store.openDialogInfo(true, 'Erreur', err.response.data.message)
        this.setState({
          oldPass: '',
          newPass: '',
          newPass1: ''
        })
      })
    } else store.openDialogInfo(true, 'Erreur', 'Erreur de saisie')
  }
  render () {
    return (
      <div className='bodyChangePass'>
        <div className='formulaire'>
        <form>
        <center><h2><u>Changement de Password</u></h2></center>
        <TextField
          floatingLabelText='Ancien Password'
          name='oldPass'
          fullWidth
          type="password"
          value={this.state.oldPass}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        /><br />
        <TextField
          floatingLabelText='Nouveau Password'
          name='newPass'
          fullWidth
          type="password"
          value={this.state.newPass}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        /><br />
        <TextField
          floatingLabelText='Nouveau Password'
          name='newPass1'
          fullWidth
          type="password"
          value={this.state.newPass1}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        /><br /><br />
        <RaisedButton
          label='Modifier'
          primary
          onClick={this.handleCahngePass.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          fullWidth
        />
      </form>
        </div>
      </div>
    )
  }
}

export default ChangePass
