/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store/app.state'

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL__STATE__ || {}

const root = document.querySelector('#root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(<AppContainer>
    <Provider appState={new AppState(initialState.appState)}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>
  </AppContainer>, root)
}
render(App)

if (module.hot) {
  module.hot.accept('./index.js', () => {
    const NextApp = require('./index.js').default //eslint-disable-line
    render(NextApp)
  })
}
