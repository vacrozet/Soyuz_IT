import React, { Component } from 'react'
import store from '../utils/store.js'
import { observer } from 'mobx-react'
import { local } from '../utils/api'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

@observer
class AddCategorie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nom: ''
    }
  }

  handleSend () {
    if (this.state.nom !== '') {
      local().post('/project/createcategorie', {
        nom: this.state.nom
      }).then((res) => {
        if (res.data.success === true){
          this.setState({
            nom: ''
          },() => {store.openDialogInput(false)})
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  handleChange (evt) { this.setState({[evt.target.name]: evt.target.value}) }
  handleKeyPress (evt) { if (evt.key === 'Enter') { this.handleSend() } }

  render () {
    const actions = [
      <FlatButton
        label='Annuler'
        primary
        onClick={() => {store.openDialogInput(false)}}
      />,
      <FlatButton
        label='Créer'
        primary
        onClick={() => {store.openDialogInput(false)}}
      />
    ]
    return (
      <Dialog
        title='Nom de la catégorie'
        actions={actions}
        modal={false}
        open={store.dialogInput}
        onRequestClose={() => {store.openDialogInput(false)}}
      >
      <TextField
        floatingLabelText='Nom de la catégorie'
        name='nom'
        fullWidth
        type="text"
        value={this.state.nom}
        onChange={this.handleChange.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
      /><br />
      </Dialog>
    )
  }
}

export default AddCategorie
