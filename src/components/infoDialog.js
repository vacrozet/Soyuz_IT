import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import store from '../utils/store.js'
import { observer } from 'mobx-react'

@observer
class InfoDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  render () {
    const actions =[
      <FlatButton
        label='Close'
        primary
        onClick={() => {store.openDialogInfo(false, '', '')}}
      />
    ]
    const text = store.dialogText
    return (
      <Dialog
        title={store.dialogTitle}
        actions={actions}
        modal={false}
        open={store.dialogOpen}
        onRequestClose={() => {store.openDialogInfo(false, '', '')}}
      >
        {text}
      </Dialog>
    )
  }
}

export default InfoDialog
