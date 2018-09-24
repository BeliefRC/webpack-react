/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import App from './views/App'

const root = document.querySelector('#root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(<AppContainer>
    <Component />
  </AppContainer>, root)
}
render(App)

if (module.hot) {
  module.hot.accept('./index.js', () => {
    const NextApp = require('./index.js').default //eslint-disable-line
    render(NextApp)
  })
}
