import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core'
import { app } from '../../base'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    })
  }

  render() {
      return <Redirect to="/" />
  }
}

export default Logout