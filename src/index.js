/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<App action="/" />,
	document.getElementById('root')
);

serviceWorker.unregister();