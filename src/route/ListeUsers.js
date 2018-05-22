import React, { Component } from 'react'
import { local } from '../utils/api'
import { Table, TableHeader, TableFooter, TableRow, TableRowColumn, TableHeaderColumn, TableBody } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import Trash from 'material-ui/svg-icons/action/delete'

class ListeUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liste: []
    }
  }
  handleActualise () {
    local().get('/user/allusers').then((res) => {
      if (res.data.success === true) this.setState({liste: res.data.message})
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillMount () {
    this.handleActualise()
  }

  handleDeleteUser (id, idSociety) {
    local().delete(`/user/delete/${id}/${idSociety}`).then((res) => {
      if (res.data.success === true) this.handleActualise()
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='bodyListeUsers'>
        <center>
          <form>
            <RaisedButton label="Ajout utilisateur" primary={true} style={{margin: 12}}
              onClick={() => {
                this.props.history.push('/add-user')
              }}
            />
          </form>
          <h5>Supprimer un utilisateur, le supprimera de touts les projets ainsi que tout ces historiques.</h5>
        </center>
        <Table
          fixedHeader
          fixedFooter
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll
          >
            <TableRow>
              <TableHeaderColumn colSpan='5' tooltip='Liste Utilisateurs' style={{textAlign: 'center'}}>
                Liste Utilisateurs
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='Société'>Société</TableHeaderColumn>
              <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Poste'>Poste</TableHeaderColumn>
              <TableHeaderColumn tooltip='Mail'>Mail</TableHeaderColumn>
              <TableHeaderColumn tooltip='Delete'>Delete</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover
            stripedRows={false}
          >
            {this.state.liste.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.nameSociety}</TableRowColumn>
                <TableRowColumn>{row.prenom + ' ' + row.nom}</TableRowColumn>
                <TableRowColumn>{row.poste}</TableRowColumn>
                <TableRowColumn>{row.mail}</TableRowColumn>
                <TableRowColumn>{<Trash
                  style={{cursor: 'pointer', position: 'center'}}
                  onClick={() => {
                    this.handleDeleteUser(row._id, row.idSociety)
                  }}
                  />}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn>Société</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableHeaderColumn>Poste</TableHeaderColumn>
              <TableRowColumn>Mail</TableRowColumn>
              <TableRowColumn>Delete</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan='5' style={{textAlign: 'center'}}>
                Liste Utilisateurs
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

export default ListeUsers
