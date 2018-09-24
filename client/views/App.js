import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader' //eslint-disable-line
import { Link } from 'react-router-dom'

import Routers from '../config/router'

/* class App extends React.Component {

  render () {
    return <div>
      This is apps
    </div>
  }
} */

export default hot(module)(() => (
  <Fragment>
    <div>
      <Link to="/">首页</Link>
      <br />
      <Link to="/detail">详情页</Link>
    </div>
    <Routers />
  </Fragment>
))
