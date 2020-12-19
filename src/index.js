import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/App";
import reducers from "./reducers";
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
console.log("Hellow1")