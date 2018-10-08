import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import { AppState } from '../../store/app.state'

@observer(['appState'])
export default class TopicList extends Component {
  static propTypes = {
    appState: PropTypes.shape({ msg: PropTypes.string.isRequired }).isRequired,
  }

  componentDidMount() {

  }

  asyncBootstrap() {
    const { appState } = this.props
    return new Promise((resolve) => {
      setTimeout(() => {
        appState.count = 3

        resolve(true)
      })
    })
  }

  render() {
    const { appState } = this.props
    return (
      <Fragment>
        <Helmet>
          <title>
            This is topic list
          </title>
          <meta name="description" content="This is topic list" />
        </Helmet>
        TopicList
        {appState.msg}
      </Fragment>
    )
  }
}
