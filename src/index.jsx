import React from 'react';
import ReactDOM from 'react-dom';

import {
  createStore, compose, applyMiddleware, combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import categoriesReducer from './store/reducers/categories';
import authorizationReducer from './store/reducers/authorization';
import registrationReducer from './store/reducers/registration';

import * as serviceWorker from './serviceWorker';

import App from './App';
import './index.css';

const rootReducer = combineReducers({
  ctr: categoriesReducer,
  auth: authorizationReducer,
  reg: registrationReducer,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
/* eslint-enable */

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
