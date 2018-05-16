import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Router from './router.js'

import {orange500} from 'material-ui/styles/colors'

const muitheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    disabledColor: orange500
  },
  appBar: {
    height: 50,
    color: orange500
  },
  TextField: {
    textColor: orange500,
    hintColor: orange500
  }
})
ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muitheme}>
      <Switch>
        <Route path='/' component={Router} />
      </Switch>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
