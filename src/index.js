import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

// outils de développement
import { composeWithDevTools } from 'redux-devtools-extension'; //les infos sont dans l'outil sur la barre du navigateur
import logger from 'redux-logger'; //les infos sont dans la console

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


