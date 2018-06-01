import React, { Component } from 'react'
import '../css/NewProject.css'
import { local } from '../utils/api'
import moment from 'moment'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import generator from 'generate-password'

function formatDate (date) {
  var d = date
  var month = '' + (d.getMonth() + 1)
  var day = '' + d.getDate()
  var year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

class NewProjectInCat extends Component {
  constructor (props) {
    super(props)
    const dateActu = new Date()
    this.state = {
      nameOfProject: '',
      categorie: this.props.match.params.idCat,
      dateActu: dateActu,
      deadLine: '',
      type: ['Traduction', 'Relecture', 'copywriting'],
      valueSelect: '',
      listUsers: '',
      values: [],
      ref: generator.generate({length: 15, uppercase: true, numbers: true}),
      langueStart: '',
      otherLangueStart: '',
      langueEnd: '',
      otherLangueEnd: '',
      langueRelecture: '',
      otherLangueRelecture: ''
    }
  }

  componentWillMount () {
    local().get('/user/info').then((res) => {
      if (res.data.success === true) {
      }
    }).catch((err) => {
      console.log(err)
    })
    local().get(`/society/alluser`).then((res1) => {
      if (res1.data.success === true) {
        for (let index = 0; index < res1.data.message.length; index++) {
          const element = res1.data.message[index]
          element.value = index
        }
        this.setState({listUsers: res1.data.message})
      }
    }).catch((err1) => { console.log(err1) })
    local().get(`/project/getonecategorie/${this.props.match.params.idCat}`).then((res2) => {
      if (res2.data.success !== true) this.props.history.push('/')
    }).catch((err2) => { console.log(err2) })
    console.log(this.state.ref)
  }

  handleChangeCola (event, index, values) { this.setState({values: values}) }
  handleChangeDate (evt, date) { this.setState({deadLine: formatDate(date)}) }
  handleChangeSelect (event, index, values) { this.setState({valueSelect: values}) }
  handleChangeLangueStart (event, index, values) { this.setState({langueStart: values}) }
  handleChangeLangueEnd (event, index, values) { this.setState({langueEnd: values}) }
  handleChangeLangueRelecture (event, index, values) { this.setState({langueRelecture: values}) }
  handleKeyPress (evt) { if (evt.key === 'Enter') { console.log(this.state) } }
  handleChange (evt) { this.setState({[evt.target.name]: evt.target.value}) }

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
            {this.state.listUsers ? (
              <SelectField
                multiple
                hintText='Colaborateurs'
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
            <TextField
              hintText='Commentaire'
              multiLine
              rows={2}
              rowsMax={10}
            /><br />
          </div>
        </div>
        <div className='secondPartie'>
          <div className='formTwo'>
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
            {this.state.valueSelect === 'Traduction' ? (
              <div>
                <SelectField
                  multiple={false}
                  hintText='Langue de Départ'
                  value={this.state.langueStart}
                  onChange={this.handleChangeLangueStart.bind(this)}
                >
                  <MenuItem key='1' checked={false} value='Francais' primaryText='Français' />
                  <MenuItem key='2' checked={false} value='Anglais' primaryText='Anglais' />
                  <MenuItem key='3' checked={false} value='Espagnol' primaryText='Espagnol' />
                  <MenuItem key='4' checked={false} value='Portugais' primaryText='Portugais' />
                  <MenuItem key='5' checked={false} value='Italien' primaryText='Italien' />
                  <MenuItem key='6' checked={false} value='Allemand' primaryText='Allemand' />
                  <MenuItem key='7' checked={false} value='Polonais' primaryText='Polonais' />
                  <MenuItem key='8' checked={false} value='Autre' primaryText='Autre' />
                </SelectField><br />
                {this.state.langueStart === 'Autre' ? (
                  <div>
                    <TextField
                      hintText='Préciser'
                      name='otherLangueStart'
                      value={this.state.otherLangueStart}
                      onChange={this.handleChange.bind(this)}
                    /><br />
                  </div>
                ) : null}
                <SelectField
                  multiple={false}
                  hintText="Langue d'arrivé"
                  value={this.state.langueEnd}
                  onChange={this.handleChangeLangueEnd.bind(this)}
                >
                  <MenuItem key='1' checked={false} value='Francais' primaryText='Français' />
                  <MenuItem key='2' checked={false} value='Anglais' primaryText='Anglais' />
                  <MenuItem key='3' checked={false} value='Espagnol' primaryText='Espagnol' />
                  <MenuItem key='4' checked={false} value='Portugais' primaryText='Portugais' />
                  <MenuItem key='5' checked={false} value='Italien' primaryText='Italien' />
                  <MenuItem key='6' checked={false} value='Allemand' primaryText='Allemand' />
                  <MenuItem key='7' checked={false} value='Polonais' primaryText='Polonais' />
                  <MenuItem key='8' checked={false} value='Autre' primaryText='Autre' />
                </SelectField><br />
                {this.state.langueEnd === 'Autre' ? (
                  <div>
                    <TextField
                      hintText='Préciser'
                      name='otherLangueEnd'
                      value={this.state.otherLangueEnd}
                      onChange={this.handleChange.bind(this)}
                    /><br />
                  </div>
                ) : null}

              </div>
            ) : null}
            {this.state.valueSelect === 'Relecture' ? (
              <div>
                <SelectField
                  multiple={false}
                  hintText='Langue du text'
                  value={this.state.langueRelecture}
                  onChange={this.handleChangeLangueRelecture.bind(this)}
                >
                  <MenuItem key='1' checked={false} value='Francais' primaryText='Français' />
                  <MenuItem key='2' checked={false} value='Anglais' primaryText='Anglais' />
                  <MenuItem key='3' checked={false} value='Espagnol' primaryText='Espagnol' />
                  <MenuItem key='4' checked={false} value='Portugais' primaryText='Portugais' />
                  <MenuItem key='5' checked={false} value='Italien' primaryText='Italien' />
                  <MenuItem key='6' checked={false} value='Allemand' primaryText='Allemand' />
                  <MenuItem key='7' checked={false} value='Polonais' primaryText='Polonais' />
                  <MenuItem key='8' checked={false} value='Autre' primaryText='Autre' />
                </SelectField>
                {this.state.langueRelecture === 'Autre' ? (
                  <div>
                    <TextField
                      hintText='Préciser'
                      name='otherLangueRelecture'
                      value={this.state.otherLangueRelecture}
                      onChange={this.handleChange.bind(this)}
                    /><br />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default NewProjectInCat
