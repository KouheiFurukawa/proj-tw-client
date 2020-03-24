import * as React from 'react';
import Container from './container/Container';
import { Login } from './Login';
import { Callback } from './Callback';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const Application: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Container} />
            <Route path="/login" component={Login} />
            <Route path="/callback" component={Callback} />
        </BrowserRouter>
    );
};

export default Application;
