import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './assets/css/reset.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import storeConfig from './redux/store'
const store = storeConfig()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)

serviceWorker.unregister();
