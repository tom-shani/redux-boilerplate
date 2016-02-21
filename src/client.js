import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './redux/create-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import getRoutes from './routes';

const dest = document.getElementById('content');
const history = createHistory();
// const history = useScroll(createHistory)();
history.__v2_compatible__ = true;
const store = createStore(history, window.__data);

const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider key='provider' store={store}>
    <div id='provider-sub'>
      {component}
    </div>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/dev-tools/dev-tools');
  ReactDOM.render(
    <Provider key='provider' store={store}>
      <div id='provider-sub'>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
