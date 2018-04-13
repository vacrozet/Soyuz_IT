import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Accueil from './route/Accueil.js'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Login from './components/Login'

import {orange500} from 'material-ui/styles/colors'

class Logged extends React.Component {
  render () {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Refresh' />
        <MenuItem primaryText='Help' />
        <MenuItem primaryText='Sign out' />
      </IconMenu>
    )
  }
}

Logged.muiName = 'IconMenu'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logged: false
    }
  }
  handleChange (event, logged) {
    this.setState({logged: logged})
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.setState({logged: true})
    }
  }

  render () {
    const muitheme = getMuiTheme({
      palette: {
        primary1Color: orange500
      },
      appBar: {
        height: 50,
        color: orange500
      },
      TextField: {
        underlineStyle: orange500,
        floatingLabelStyle: orange500,
        floatingLabelFocusStyle: orange500
      }
    })

    return (
      <div>
        <MuiThemeProvider muiTheme={muitheme}>
          <div>
            <AppBar
              title='SOYUZ IT'
              onLeftIconButtonClick={() => console.log('coucou')}
              iconElementRight={this.state.logged ? <Logged /> : <Login />}
            />
            <BrowserRouter>
              <Switch>
                <Route path='/' component={Accueil} />
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)

registerServiceWorker()
