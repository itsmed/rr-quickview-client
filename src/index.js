import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './index.css';
import { Provider } from 'react-redux';
import store from './makeStore';

import { browserHistory } from 'react-router-dom';


ReactDOM.render(
  <Provider store={store} history={browserHistory}>
    <App />
  </Provider>,
  document.getElementById('root')
);
