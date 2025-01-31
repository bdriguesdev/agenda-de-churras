import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import AuthRoute from './routes/AuthRoute';
import NoAuthRoute from './routes/NoAuthRoute';
import ErrorModal from './components/Modals/ErrorModal/ErrorModal';

const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    };
};

const App = props => {
    return (
        <Router>
            <div className="App">
                {
                    props.token?
                        <AuthRoute />:
                        <NoAuthRoute />
                }
                <ErrorModal />
            </div>
        </Router>
    );
}

export default connect(
    mapStateToProps
)(App);
