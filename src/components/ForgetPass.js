import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { local } from '../utils/api.js'
import store from '../store.js'
import { observer } from 'mobx-react'


@observer
class ForgetPass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mail: ''
    }
  }
  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleConnexion () {
    if (this.state.mail !== '') {
      local().post('/user/resetpassword', 
        {
          params:{
            mail: this.state.mail,
          }
        }).then((res) => {
          console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleConnexion()
    }
  }
  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onClick={() => {store.toggleDialogPassword(false)}}
      />,
      <FlatButton
        label='Submit'
        primary
        disabled={false}
        onClick={this.handleConnexion.bind(this)}
      />
    ]
    return (
      <Dialog
        title='Reset Password'
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={store.dialogPassword}
        onRequestClose={() => {store.toggleDialogPassword(false)}}
      >
        <TextField
          floatingLabelText='Email'
          name='mail'
          type='mail'
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </Dialog>
    )
  }
}

export default ForgetPass
