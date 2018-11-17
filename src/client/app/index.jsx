import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import { reducer } from './reducers/cars';

import { injectGlobal } from 'styled-components';

/* eslint-disable */
injectGlobal`
  body {
    padding: 0;
    margin: 0;
    font-size: 22px;
  }
`;
/* eslint-enable */

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
