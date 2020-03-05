import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Churrascos from '../pages/Churrascos/Churrascos';
import Churrasco from '../pages/Churrasco/Churrasco';

const authRoute = () => {
    return (
        <Switch>
            <Route path="/churrascos" component={Churrascos} />
            <Route path="/churrasco/:id" component={Churrasco} />
    
            <Redirect from="*" to="/churrascos" />
        </Switch>
    );
};

export default authRoute;