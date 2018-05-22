import React, { Component } from 'react'
import { local } from '../utils/api'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import '../css/SettingsSociety.css'
import store from '../utils/store.js'
import { observer } from 'mobx-react'

@observer
class SettingsSociety extends Component {
  constructor (props) {
    super(props)
    this.state = {
      libele: '',
      nameOfSociety: '',
      adress: '',
      nextAdress: '',
      pc: '',
      city: '',
      country: '',
      siret: ''
    }
  }
  handleModify () {
    if (this.state.name !== '' &&
    this.state.nameOfSociety !== '' &&
    this.state.siret.length === 14) {
      local().post('/society/modify', {
        idSociety: this.props.match.params.idSociety,
        name: this.state.libele,
        nameOfSociety: this.state.nameOfSociety,
        adress: this.state.adress,
        nextAdress: this.state.nextAdress,
        pc: this.state.pc,
        city: this.state.city,
        country: this.state.country,
        siret: this.state.siret
      }).then((res) => {
        if (res.data.success === true) {
          this.handleActualise()
          store.openDialogInfo(true, 'Succès', res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleKeyPress (evt) {
    if (evt.key === 'Enter') {
      this.handleModify()
    }
  }
  handleActualise () {
    local().get(`/society/info/${this.props.match.params.idSociety}`).then((res) => {
      if (res.data.success === true) {
        this.setState({
          libele: res.data.message[0].name,
          nameOfSociety: res.data.message[0].nameOfSociety,
          adress: res.data.message[0].adress,
          nextAdress: res.data.message[0].next_adress,
          pc: res.data.message[0].pc,
          city: res.data.message[0].city,
          country: res.data.message[0].country,
          siret: res.data.message[0].siret
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillMount () {
    this.handleActualise()
  }

  render () {
    return (
      <div className='bodySettingsSociety'>
        <div className='formulaire'>
          <form>
            <center>
              <h2><u>Préférences</u></h2>
            </center>
            <TextField
              floatingLabelText='Libelé'
              name='libele'
              fullWidth
              value={this.state.libele}
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

export default SettingsSociety
