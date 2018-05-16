import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import { local } from '../utils/api.js'
import store from '../store.js'
import { observer } from 'mobx-react'

@observer
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      login: '',
      password: ''
    }
  }
  static muiName = 'FlatButton'

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleConnexion () {
    if (this.state.login !== '' && this.state.password !== '') {
      local().get('/user/signin', 
        {
        params:{
          login: this.state.login,
          password: this.state.password
        }
        }).then((res) => {
          console.log(res)
          if (res.data.success === true) {
            this.setState({open: !this.state.open}, () => {
              global.localStorage.setItem('token', res.data.token)
              store.logged(res.data.success)
            })
          }
        }).catch((err) => {
          console.log('Erreur')
        })
    }
  }

  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleConnexion()
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.setState({open: false})}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.handleConnexion.bind(this)}
      />,
    ]

    return (
      <div>
        <FlatButton
          {...this.props}
          label="Login"
          onClick={() => {this.setState({open: !this.state.open})} }
        />
        <Dialog
          title='Connexion'
          actions={actions}
          modal={false}
          autoScrollBodyContent={true}
          open={this.state.open}
          onRequestClose={() => this.setState({open: false})}
        >
          <TextField
            floatingLabelText='Login'
            name='login'
            value={this.state.login}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          /><br />
          <TextField
            floatingLabelText='Password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
        </Dialog>
      </div>
    )
  }
}

export default Login
