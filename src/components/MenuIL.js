import React, { Component } from 'react'
import MobileTearSheet from './MobileTearSheet'

import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'

import Settings from 'material-ui/svg-icons/action/settings'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import GroupAdd from 'material-ui/svg-icons/social/group-add'
import Lists from 'material-ui/svg-icons/action/list'
import Lock from 'material-ui/svg-icons/action/lock'
import Add from 'material-ui/svg-icons/content/add'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'

import store from '../utils/store.js'
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
            primaryText={store.nameLogin}
            disabled
          />
          <Divider />
          {!store.admin ? (
            <ListItem primaryText='Nouveau Projet' hoverColor='#fbbc05' leftIcon={<Add />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/new-project')
              }}
            />
          ) : null}
          {!store.admin ? (
            <ListItem primaryText='Projets' hoverColor='#fbbc05' leftIcon={<Lists />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/projects')
              }}
            />
          ) : null}
          <Divider />
          {store.admin ? (
            <ListItem primaryText='Ajouté utilisateur' hoverColor='#fbbc05' leftIcon={<PersonAdd />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/add-user')
              }}
            />
          ) : null}
          {store.admin ? (
            <ListItem primaryText='Utilisateurs' hoverColor='#fbbc05' leftIcon={<Lists />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/liste-users')
              }}
            />
          ) : null}
          {store.admin ? (
            <ListItem primaryText='Ajouté Société' hoverColor='#fbbc05' leftIcon={<GroupAdd />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/add-society')
              }}
            />
          ) : null}
          {store.admin ? (
            <ListItem primaryText='Sociétés' hoverColor='#fbbc05' leftIcon={<Lists />}
              onClick={() => {
                store.drowerAppBar(false)
                this.props.history.push('/liste-society')
              }}
            />
          ) : null}
          {store.admin ? (
            <Divider />
          ) : null}
          <ListItem primaryText='Settings' hoverColor='#fbbc05' leftIcon={<Settings />} 
          onClick={() => {
            store.drowerAppBar(false)
            this.props.history.push('/settings')
          }}
          />
          <ListItem primaryText='Password' hoverColor='#fbbc05' leftIcon={<Lock />} 
            onClick={() => {
              store.drowerAppBar(false)
              this.props.history.push('/settings/changepass')
            }}
          />
          <ListItem primaryText='Log Out' hoverColor='#fbbc05' leftIcon={<PowerSettingsNew />}
            onClick={() => {
              store.logged(false)
              store.drowerAppBar(false)
              store.passAdmin(false)
              store.nameLogged('')
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


