import React from "react";
import ReactDOM from "react-dom";
import {filter_value} from './constants/filters_values';
//import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//import { composeWithDevTools } from "redux-devtools-extension";
//import createHistory from "history/createBrowserHistory";

import App from "./App";
import reducers from "./reducers";
//import { rootSaga } from "./sagas";
//import saga from "./saga";

import "antd/dist/antd.css";

import mySaga from "./saga";


const sagaMiddleware = createSagaMiddleware(mySaga);

const rootElement = document.getElementById("root");

const store = createStore( reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(
    <React.StrictMode >
        <Provider store = { store }>
        <App />
        </Provider> 
    </React.StrictMode>,
    rootElement
);