import React, { Component } from 'react'
import MobileTearSheet from './MobileTearSheet'
import {List, ListItem} from 'material-ui/List'
import Settings from 'material-ui/svg-icons/action/settings'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import Divider from 'material-ui/Divider'
import store from '../store.js'
import { observer } from 'mobx-react'

@observer
class MenuIL extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MobileTearSheet>
        <List>
          <ListItem
            primaryText="valentin"
            disabled
          />
          <Divider />
          <Divider />
          <ListItem primaryText='Settings' hoverColor='#fbbc05' leftIcon={<Settings />} />
          <ListItem primaryText='Log Out' hoverColor='#fbbc05' leftIcon={<PowerSettingsNew />}
            onClick={() => {
              store.logged(false)
              this.props.history.push('/')
            }}
          />
        </List>
      </MobileTearSheet>
    )
  }
}

export default MenuIL


// <ListItem primaryText='Close' leftIcon={<Clear />} onClick={() => {
//   store.drowerAppBar(false)
// }} />