import createMiddleware from '../helpers/client-middleware'
import {createStore as _createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import {ErrorRecord} from './modules/error/schema'
import {RoutingRecord} from './modules/routing/schema'

function convertDataToImmutable(data) {
  return {
    error: new ErrorRecord(data.error || {}),
    routing: new RoutingRecord(data.routing || {})
  }
}

export default function createStore(history = {}, client, data = {}) {
  const middleware = [
    createMiddleware(client),
    routerMiddleware(history),
    thunkMiddleware
  ]

  let finalCreateStore

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools')
    const DevTools = require('../containers/dev-tools/dev-tools')

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore)
  }

  const reducer = require('./reducer')
  const store = finalCreateStore(reducer, convertDataToImmutable(data))

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'))
    })
  }

  return store
}
