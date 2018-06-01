import React, { Component } from 'react'
import '../css/Projects.css'
import store from '../utils/store.js'
import { observer } from 'mobx-react'
import { local } from '../utils/api'

import RaisedButton from 'material-ui/RaisedButton'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import FileFolder from 'material-ui/svg-icons/file/folder'
import {orange400} from 'material-ui/styles/colors'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import InsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file'

@observer
class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listeCategorie: []
    }
  }
  
  componentWillMount () {
    local().get('/project/getcategorie').then((res) => {
      if (res.data.success === true) this.setState({listeCategorie: res.data.message}, () => {console.log(this.state.listeCategorie)})
    }).catch((err) => {
      console.log(err)
    })
    // local().get('/project/').then((res) => {
    //   this.setState({listeCategorie: res.data.message})
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  resultTab (tab) {
    tab.map((res, index) => {
      return (
        <ListItem
          key={index}
          leftAvatar={<Avatar icon={<InsertDriveFile />} />}
          primaryText={res.nom}
        />
      )  
    })
  }

  
  render () {
    const iconButtonElement = (
      <IconButton
        touch={false}
        tooltip="Plus"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={orange400} />
      </IconButton>
    );
    return (
      <div className='bodyProjects'>
        <div className='firstPart'>
          <div className='formulaire'>
            <form>
              <RaisedButton label='créer une catégorie' primary style={{margin: 12}}
                onClick={() => {
                  store.openDialogInput(true)
                }}
              />
              <RaisedButton label='créer un projet' primary style={{margin: 12}}
                onClick={() => {
                  this.props.history.push('/new-project')
                }}
              />
            </form>
          </div>
        </div>
        <div className='secondPart'>
          {this.state.listeCategorie ? ( this.state.listeCategorie.map((res, index) => {
            return (
              <div
                key={index}
              >
              <ListItem
              key={index}
              primaryText={res.nom}
              isKeyboardFocused
              leftAvatar={<Avatar icon={<FileFolder />} />}
              rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem
                  onClick={() => {
                    console.log(res._id)
                  }}>Ajouter un projet</MenuItem>
                </IconMenu>
              }
              primaryTogglesNestedList={true}
              nestedItems={res.project ? res.project.map((res1, index1) => {
                return (
                  <ListItem
                  key={index}
                  leftAvatar={<Avatar icon={<InsertDriveFile />} />}
                  primaryText={res.nom}
                />
              )  
              }) : null}
            />
            <Divider />
            </div>
            )
          })
          ) : null}
        </div>
      </div>
    )
  }
}

export default Projects