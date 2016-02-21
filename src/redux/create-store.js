import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {syncHistory} from 'react-router-redux';

export default function createStore(history, data = {}) {
  const router = syncHistory(history);
  const middleware = [
    router,
    thunkMiddleware
  ];

  let finalCreateStore;

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {persistState} = require('redux-devtools');
    const DevTools = require('../containers/dev-tools/dev-tools');

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducer');
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__) {
    router.listenForReplays(store);

    if (module.hot) {
      module.hot.accept('./reducer', () => {
        store.replaceReducer(require('./reducer'));
      });
    }
  }

  return store;
}
