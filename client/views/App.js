import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader' //eslint-disable-line
import Routers from '../config/router'
import AppBar from './layout/app-bar'

/* class App extends React.Component {

  render () {
    return <div>
      This is apps
    </div>
  }
} */

export default hot(module)(() => (
  <Fragment>
    <AppBar />
    <Routers />
  </Fragment>
))
