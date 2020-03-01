import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />

                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
