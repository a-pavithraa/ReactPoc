import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import autoExceptionReducer from './store/reducers/autoExceptionReducer';
import arReducer from './store/reducers/accountsReceivableReducer';
import drilldownReducer from './store/reducers/drilldownReducer';
import { Provider } from 'react-redux';
const rootReducer = combineReducers({
  masterExceptions: autoExceptionReducer,
  drilldownDetails: drilldownReducer,
  arReducer:arReducer
});
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


const app =(
   
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      
      <App />
  
      </BrowserRouter>
      </Provider>
  )
  ReactDOM.render(app, document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();