import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/styles/main.scss"
import {Provider} from "react-redux";
import store from "./store";
import SnackbarProvider from "./components/providers/SnackbarProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider>
                <App/>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>
);
