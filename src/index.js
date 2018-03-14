import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducer'
import './config'
import './index.css'
import App from './app'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// boss genius me msg 4个页面


    ReactDOM.render(
        (<Provider store={store}>
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    )



