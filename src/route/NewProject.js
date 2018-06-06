import React, { Component } from 'react'
import '../css/NewProject.css'
import { local } from '../utils/api'
import moment from 'moment'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

function formatDate (date) {
  var d = date
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()
  var year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

class NewProject extends Component {
  constructor (props) {
    super(props)
    const dateActu = new Date()
    this.state = {
      nameOfProject: '',
      dateActu: dateActu,
      deadLine: '',
      type: ['Traduction', 'Relecture', 'copywriting'],
      valueSelect: '',
      listUsers: '',
      values: []
    }
  }

  componentWillMount () {
    local().get('/user/info').then((res) => {
      if (res.data.success === true) {
      }
    }).catch((err) => { console.log(err) })
    local().get(`/society/alluser`).then((res1) => {
      if (res1.data.success === true) {
        for (let index = 0; index < res1.data.message.length; index++) {
          const element = res1.data.message[index]
          element.value = index
        }
        this.setState({listUsers: res1.data.message})
      }
    }).catch((err1) => { console.log(err1) })
  }

  handleChangeSelect (event, index, values) { this.setState({valueSelect: values}) }
  handleChange (evt) { this.setState({[evt.target.name]: evt.target.value}) }
  handleChangeDate (evt, date) { this.setState({deadLine: formatDate(date)}) }
  handleChangeCola (event, index, values) { this.setState({values: values}) }
  handleKeyPress (evt) { if (evt.key === 'Enter') { console.log(this.state) } }

  selectionRenderer (values) {
    switch (values.length) {
      case 0:
        return ''
      case 1:
        return this.state.values[0].prenom
      default:
        return `${values.length} personnes selectionnées`
    }
  }
  menuItems (persons) {
    return persons.map((person) => (
      <MenuItem
        key={person.value}
        insetChildren
        checked={this.state.values.indexOf(person) > -1}
        value={person}
        primaryText={person.prenom + ' ' + person.nom}
      />
    ))
  }

  render () {
    return (
      <div className='bodyNewProject'>
        <div className='firstPartie'>
          <div className='formOne'>
            <TextField
              floatingLabelText='Nom du project'
              name='nameOfProject'
              value={this.state.nameOfProject}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            /><br />
            <SelectField
              multiple={false}
              hintText='Type de projet'
              value={this.state.valueSelect}
              onChange={this.handleChangeSelect.bind(this)}
            >
              <MenuItem key='1' checked={false} value='Traduction' primaryText='Traduction' />
              <MenuItem key='2' checked={false} value='Relecture' primaryText='Relecture' />
              <MenuItem key='3' checked={false} value='Copywriting' primaryText='Copywriting' />
            </SelectField><br />
            {this.state.listUsers ? (
              <SelectField
                multiple
                hintText='Select a name'
                value={this.state.values}
                onChange={this.handleChangeCola.bind(this)}
                selectionRenderer={this.selectionRenderer.bind(this)}
              >
                {this.menuItems(this.state.listUsers)}
              </SelectField>
            ) : null}
            <DatePicker
              floatingLabelText='Date De Création'
              defaultDate={this.state.dateActu}
              disabled
            />
            <DatePicker
              floatingLabelText='Date de fin souhaité'
              minDate={this.state.dateActu}
              onChange={this.handleChangeDate.bind(this)}
              formatDate={(date) => moment(date).format('YYYY-MM-DD')}
            />
          </div>
        </div>
        <div className='secondPartie'>
          <div className='formTwo' />
        </div>
      </div>
    )
  }
}

export default NewProject
