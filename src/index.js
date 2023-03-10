import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import styles from './styles/styles.scss'

ReactDOM.render(
    <HashRouter>
    <App />
    </HashRouter>,
    document.getElementById('root')
)