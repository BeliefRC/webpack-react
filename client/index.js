/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import { Provider } from 'mobx-react'
import App from './views/App'
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
})

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL__STATE__ || {}

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const appState = new AppState(initialState.appState)
appState.init(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const root = document.querySelector('#root')
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(<AppContainer>
    <Provider appState={appState} topicStore={topicStore}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Component />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </AppContainer>, root)
}
render(createApp(App))

if (module.hot) {
  module.hot.accept('./index.js', () => {
    const NextApp = require('./index.js').default //eslint-disable-line
    render(createApp(NextApp))
  })
}
