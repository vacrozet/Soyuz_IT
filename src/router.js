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
import ListeSociety from './route/ListeSociety.js'
import SettingsSociety from './route/SettingsSociety'
import NewProject from './route/NewProject'
import Projects from './route/Projects'
import NewProjectInCat from './route/NewProjectInCat'

import store from './utils/store.js'
import { observer } from 'mobx-react'
import { local } from './utils/api';
import AddCategorie from './components/AddCategorie';

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
    local().get('/user/info').then((res) => {
      if (res.data.message.admin === true) store.passAdmin(true)
      store.nameLogged(res.data.message.prenom)
    }).catch((err) => {
      console.log(err)
    })
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
        <AddCategorie />
        <Switch>
          <Route exact path='/projects' component={Projects} />
          <Route exact path='/liste-society' component={ListeSociety} />
          <Route exact path='/liste-users' component={ListeUsers} />
          <Route exact path='/settings/changepass' component={ChangePass} />
          <Route exact path='/settings/:idSociety' component={SettingsSociety} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/add-user' component={AddUser} />
          <Route exact path='/add-society' component={AddSociety} />
          <Route exact path='/new-project/:idCat' component={NewProjectInCat} />
          <Route exact path='/new-project' component={NewProject} />
          <Route path='/' component={Accueil} />
        </Switch>
      </div>
    )
  }
}

export default Router
