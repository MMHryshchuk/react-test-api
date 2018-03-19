import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers ,createStore } from 'redux'

import './index.css';
import App from './App';
import checkReducers  from './reducers'
import userReducers  from './reducers'
import reducers  from './reducers'

import registerServiceWorker from './registerServiceWorker';

const app = document.getElementById('root');

/*
const reducers =  combineReducers({
    checkReducers,
    userReducers,
});
*/

const store = createStore(reducers);

ReactDOM.render(
    <Provider  store={store} >
        <App/>
    </Provider>
    , app);
registerServiceWorker();
