import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login/Login.js';
import Register from '../pages/Register/Register';
import Churrascos from '../pages/Churrascos/Churrascos';
import Churrasco from '../pages/Churrasco/Churrasco';

const NoAuthRoute = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/churrascos" component={Churrascos} />
            <Route path="/churrasco/:id" component={Churrasco} />
    
            <Redirect from="*" to="/churrascos" />
        </Switch>
    );
};

export default NoAuthRoute;