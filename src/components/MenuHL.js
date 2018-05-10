import React, { Component } from 'react'
import MobileTearSheet from './MobileTearSheet'
import {List, ListItem} from 'material-ui/List'
import Lock from 'material-ui/svg-icons/action/lock'
import Clear from 'material-ui/svg-icons/content/clear'
import Divider from 'material-ui/Divider'
import store from '../store.js'
import { observer } from 'mobx-react'

@observer
class MenuHL extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <MobileTearSheet>
        <List>
          <ListItem primaryText='Close' leftIcon={<Clear />} 
            hoverColor='#fbbc05'
            onClick={() => {store.drowerAppBar(false)}}
          />
          <Divider />
          <ListItem primaryText='Oublie' 
            hoverColor='#fbbc05'
            leftIcon={<Lock />}
            onClick={() => {store.toggleDialogPassword(true)}}
          />
        </List>
      </MobileTearSheet>
    )
  }
}

export default MenuHL
