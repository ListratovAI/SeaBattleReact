import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {StartMenu} from "./startMenu";
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {Provider} from "react-redux";


const render = () =>
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <StartMenu />
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
render();

store.subscribe(render);