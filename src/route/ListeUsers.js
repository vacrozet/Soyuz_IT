import React, { Component } from 'react'
import { local } from '../utils/api'

class ListeUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liste: []
    }
  }

  componentWillMount () {
    local().get('/society/users').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className='bodyListeUsers'>
        {console.log(this.state)}
      </div>
    )
  }
}

export default ListeUsers
