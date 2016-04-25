import ApiClient from './helpers/api-client'
import React from 'react'
import {render} from 'react-dom'

import useScroll from 'scroll-behavior/lib/useStandardScroll'
import createStore from './redux/create-store'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory, Router} from 'react-router'

import getRoutes from './routes'

const client = new ApiClient()
const dest = document.getElementById('content')
const preHistory = useScroll(() => browserHistory)()
const store = createStore(preHistory, client, window.INITIAL_STATE)
const history = syncHistoryWithStore(preHistory, store)

const component = <Router history={history} routes={getRoutes(store)} />

// Listen for route changes on the browser history instance:
// browserHistory.listen(location => {})

render(
  <Provider key='provider' store={store}>
    <div id='provider-sub'>
      {component}
    </div>
  </Provider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/dev-tools/dev-tools')
  render(
    <Provider key='provider' store={store}>
      <div id='provider-sub'>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  )
}
