import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/es/integration/react";

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './app.css';
import store from "./store";
import persistor from "./persistor";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
