import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import userReducer from './store/reducers/user';
import categoriesReducer from './store/reducers/categories';

import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

const rootReducer = combineReducers({
  usr: userReducer,
  ctr: categoriesReducer,
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
