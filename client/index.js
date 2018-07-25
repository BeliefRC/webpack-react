import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

const root = document.querySelector('#root')
const render = Component => {
  const renderMethod=module.hot ? ReactDOM.render :ReactDOM.hydrate;
  renderMethod(<AppContainer>
    <Component/>
  </AppContainer>, root)
}
render(App)

if (module.hot) {
  module.hot.accept('./index.js', () => {
    const NextApp = require('./index.js').default
    render(NextApp)
  })
}