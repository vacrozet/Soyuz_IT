import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import store from '../utils/store.js'
import { observer } from 'mobx-react'
import IconMenu from 'material-ui/IconMenu'

@observer
class Logged extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
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
        <MenuItem primaryText='Sign out' onClick={() => {
          store.logged(false)
          global.localStorage.removeItem('token')
          this.props.history.push('/')
        }} />
      </IconMenu>
    )
  }
}

Logged.muiName = 'IconMenu'

export default Logged
