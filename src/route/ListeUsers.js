import React, { Component } from 'react'
import { local } from '../utils/api'
import { Table, TableHeader, TableFooter, TableRow, TableRowColumn, TableHeaderColumn, TableBody } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import store from '../store.js'
import { observer } from 'mobx-react'

@observer
class ListeUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liste: [],
    }
  }

  componentWillMount () {
    local().get('/user/allusers').then((res) => {
      if (res.data.success === true) this.setState({liste: res.data.message})
    }).catch((err) => {
      console.log(err)
    })
  }
  handleCellClick (row, column, event) {
    store.addListe(this.state.liste[row]._id)
  }
  handleDeleteUser () {
    console.log(store.listeSelect)
    local().delete(`/user/delete/${store.listeSelect}`).then((res) => {
      console.log(res)
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
          <RaisedButton label="Supprimer utilisateur" style={{margin: 12}}
            onClick={() => {
              this.handleDeleteUser()
            }}
          />
          </form>
        </center>
        <Table
          fixedHeader
          fixedFooter
          selectable
          multiSelectable
          onCellClick={this.handleCellClick.bind(this)}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox
            enableSelectAll
          >
            <TableRow>
              <TableHeaderColumn colSpan='4' tooltip='Liste Utilisateurs' style={{textAlign: 'center'}}>
                Liste Utilisateurs
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip='Société'>Société</TableHeaderColumn>
              <TableHeaderColumn tooltip='Name'>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip='Poste'>Poste</TableHeaderColumn>
              <TableHeaderColumn tooltip='Mail'>Mail</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox
            deselectOnClickaway={false}
            showRowHover
            stripedRows={false}
          >
            {this.state.liste.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn tooltip='Société'>{row.nameSociety}</TableRowColumn>
                <TableRowColumn tooltip='Nom'>{row.prenom + ' ' + row.nom}</TableRowColumn>
                <TableRowColumn tooltip='Poste'>{row.poste}</TableRowColumn>
                <TableRowColumn tooltip='Mail'>{row.mail}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox
          >
            <TableRow>
              <TableRowColumn>Société</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableHeaderColumn>Poste</TableHeaderColumn>
              <TableRowColumn>Mail</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan='4' style={{textAlign: 'center'}}>
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
