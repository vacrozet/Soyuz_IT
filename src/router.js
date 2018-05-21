import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import MenuHL from './components/MenuHL.js'
import MenuIL from './components/MenuIL.js'
import ForgetPass from './components/ForgetPass.js'
import InfoDialog from './components/infoDialog.js'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import Accueil from './route/Accueil.js'
import AddSociety from './route/AddSociety.js'
import AddUser from './route/AddUser.js'
import Settings from './route/Settings.js'
import ChangePass from './route/ChangePass.js'
import ListeUsers from './route/ListeUsers.js'

import store from './store.js'
import { observer } from 'mobx-react'

@observer
class Router extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false,
      open: false
    }  
  }
  handleChange (event, logged) {
    this.setState({logged: true})
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      store.logged(true)
    }
  }

  render () {
    return (
      <div>
        <AppBar
          title='SOYUZ IT'
          // showMenuIconButton={false}
          onTitleClick={() => {
            this.props.history.push('/')
          }}
          onLeftIconButtonClick={() => {store.drowerAppBar(true)}}
          iconElementRight={store.login ? null : <Login history={this.props.history} /> }
        />
        <Drawer
          docked={false}
          width={200}
          open={store.drawer}
          onRequestChange={() => {store.drowerAppBar(false)}}
        >
        {!store.login ? <MenuHL history={this.props.history}/> : <MenuIL history={this.props.history}/> }
        </Drawer>
        <ForgetPass />
        <InfoDialog />
        <Switch>
          <Route eact path='/liste-users' component={ListeUsers} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/settings/changepass' component={ChangePass} />
          <Route exact path='/add-user' component={AddUser} />
          <Route exact path='/add-society' component={AddSociety} />
          <Route path='/' component={Accueil} />
        </Switch>
      </div>
    )
  }
}

export default Router
