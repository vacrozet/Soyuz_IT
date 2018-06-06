import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { local } from '../utils/api.js'
import store from '../utils/store.js'
import { observer } from 'mobx-react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import validator from  'validator'

@observer
class ForgetPass extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mail: '',
      loading: false,
      disabledCTA: false
    }
  }
  handleChange (evt) { this.setState({[evt.target.name]: evt.target.value}) }
  handleKeyPress (evt) { if (evt.key === 'Enter') { this.handleConnexion() } }
  handleConnexion () {
    if (validator.isEmail(this.state.mail)) {
      this.setState({
        loading: true,
        disabledCTA: true
      })
      local().post('/user/resetpassword', 
        {
          mail: this.state.mail,
        }).then((res) => {
          console.log(res)
          if (res.data.success === true) {
            this.setState({
              loading: false,
              disabledCTA: false
            }, () => {
              store.openDialogInfo(true,  'Reset Password', `Un mail vous à été envoyé à ${this.state.mail}`)
              setTimeout(() => {
                store.toggleDialogPassword(false)
              }, 1000);
            })
          }
      }).catch((err) => {
        store.openDialogInfo(true,  'Erreur', `${err.response.data.message}`)
        this.setState({
          loading: false,
          disabledCTA: false,
          mail: ''
        })
      })
    }
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        disabled={this.state.disabledCTA}
        onClick={() => {store.toggleDialogPassword(false)}}
      />,
      <FlatButton
        label='Submit'
        primary
        disabled={this.state.disabledCTA}
        onClick={this.handleConnexion.bind(this)}
      />
    ]
    return (
      <Dialog
        title='Reset Password'
        actions={actions}
        modal={this.state.disabledCTA}
        autoScrollBodyContent
        open={store.dialogPassword}
        onRequestClose={() => {store.toggleDialogPassword(false)}}
      >
      Cette opération peut prendre plusieurs minutes <br />
      <TextField
        floatingLabelText='Email'
        name='mail'
        type='mail'
        value={this.state.mail}
        disabled={this.state.disabledCTA}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
      />
      {this.state.loading? (
        <RefreshIndicator
        size={50}
        left={0}
        top={0}
        loadingColor="#FF9800"
        status="loading"
        style={{position: 'relative', marginLeft: '50%'}}
        />
      ) : null}
      </Dialog>
    )
  }
}

export default ForgetPass
