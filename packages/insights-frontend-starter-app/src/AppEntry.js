import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from './store';
import App from './App';

const AppEntry = ({ logger }) => (
    <Provider store={ (logger ? init(logger) : init()).getStore() }>
        <Router basename="/insights">
            <App/>
        </Router>
    </Provider>
);

AppEntry.propTypes = {
    logger: PropTypes.func
};

export default AppEntry;
