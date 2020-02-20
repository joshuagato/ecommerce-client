import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import regisReducer from './store/reducers/registration';
import loginReducer from './store/reducers/login';
import updateReducer from './store/reducers/update-details';
import loggedUserReducer from './store/reducers/logged-in-user-details';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    regisReducer: regisReducer,
    loginReducer: loginReducer,
    updateReducer: updateReducer,
    loggedUserReducer: loggedUserReducer
});

const reduxStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
