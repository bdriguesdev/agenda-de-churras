import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register';
import Churrascos from './pages/Churrascos/Churrascos';
import Churrasco from './pages/Churrasco/Churrasco';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/churrascos" component={Churrascos} />
                    <Route path="/churrasco/:id" component={Churrasco} />

                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
