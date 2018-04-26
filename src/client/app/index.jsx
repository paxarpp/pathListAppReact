import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import{ createStore } from 'redux';

import App from './app';
import { reducer } from './reducers/cars';

const store = createStore(reducer);

ReactDom.render((
    <Provider store={store}>
            <App />
    </Provider>
), document.getElementById('app'));