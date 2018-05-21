import React, { Component } from 'react'
import MobileTearSheet from './MobileTearSheet'
import {List, ListItem} from 'material-ui/List'
import Settings from 'material-ui/svg-icons/action/settings'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import GroupAdd from 'material-ui/svg-icons/social/group-add'
import Lists from 'material-ui/svg-icons/action/list'
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
          <ListItem primaryText='Ajouté utilisateur' hoverColor='#fbbc05' leftIcon={<PersonAdd />}
          onClick={() => {
            store.drowerAppBar(false)
            this.props.history.push('/add-user')
          }}
          />
          <ListItem primaryText='Utilisateurs' hoverColor='#fbbc05' leftIcon={<Lists />}
          onClick={() => {
            store.drowerAppBar(false)
            this.props.history.push('/add-user')
          }}
          />
          <ListItem primaryText='Ajouté Société' hoverColor='#fbbc05' leftIcon={<GroupAdd />}
            onClick={() => {
              store.drowerAppBar(false)
              this.props.history.push('/add-society')
            }}
          />
          <ListItem primaryText='Sociétés' hoverColor='#fbbc05' leftIcon={<Lists />}
          onClick={() => {
            store.drowerAppBar(false)
            this.props.history.push('/add-user')
          }}
          />
          <Divider />
          <ListItem primaryText='Settings' hoverColor='#fbbc05' leftIcon={<Settings />} 
            onClick={() => {
              store.drowerAppBar(false)
              this.props.history.push('/settings')
            }}
          />
          <ListItem primaryText='Log Out' hoverColor='#fbbc05' leftIcon={<PowerSettingsNew />}
            onClick={() => {
              store.logged(false)
              store.drowerAppBar(false)
              global.localStorage.removeItem('token')
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