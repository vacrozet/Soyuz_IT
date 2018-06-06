import React, { Component } from 'react'
import { local } from '../utils/api'
import '../css/ListeSociety.css'

import { Table, TableHeader, TableFooter, TableRow, TableRowColumn, TableHeaderColumn, TableBody } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import Trash from 'material-ui/svg-icons/action/delete'
import Settings from 'material-ui/svg-icons/action/settings'

class ListeSociety extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liste: []
    }
  }

  handleActualise () {
    local().get('/society/allsociety').then((res) => {
      if (res.data.success === true) this.setState({liste: res.data.message})
    }).catch((err) => { console.log(err) })
  }

  handleDelete (id) {
    local().delete(`/society/delete/${id}`).then((res) => {
      if (res.data.success) this.handleActualise()
    }).catch((err) => { console.log(err) })
  }

  componentWillMount () { this.handleActualise() }

  render () {
    return (
      <div className='bodyListeSociety'>
        <center>
          <form>
            <RaisedButton label='Ajouté Société' primary style={{margin: 12}}
              onClick={() => {
                this.props.history.push('/add-society')
              }}
            />
          </form>
          <h5>Supprimer une société, supprimera de tout ces Utilisateurs.</h5>
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
              <TableHeaderColumn tooltip='Société'>Libelé</TableHeaderColumn>
              <TableHeaderColumn tooltip='Name'>Nom</TableHeaderColumn>
              <TableHeaderColumn tooltip='Poste'>Ville</TableHeaderColumn>
              <TableHeaderColumn tooltip='Mail'>Nb d'employé</TableHeaderColumn>
              <TableHeaderColumn tooltip='Delete'>Modifier</TableHeaderColumn>
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
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.nameOfSociety}</TableRowColumn>
                <TableRowColumn>{row.city}</TableRowColumn>
                <TableRowColumn>{row.team.length}</TableRowColumn>
                <TableRowColumn>{<span><Trash
                  style={{margin: 2, cursor: 'pointer'}}
                  onClick={() => { this.handleDelete(row._id) }}
                /><Settings
                  style={{margin: 2, cursor: 'pointer'}}
                  onClick={() => {
                    this.props.history.push(`/settings/${row._id}`)
                  }}
                /></span>}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableRowColumn>Libelé</TableRowColumn>
              <TableRowColumn>Nom</TableRowColumn>
              <TableHeaderColumn>Ville</TableHeaderColumn>
              <TableRowColumn>Nb d'employé</TableRowColumn>
              <TableRowColumn>Modifier</TableRowColumn>
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

export default ListeSociety
