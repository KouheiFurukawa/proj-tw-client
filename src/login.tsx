import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

ReactDOM.render(
    <Button href="http://localhost:3000/auth">Twitterアカウントでログインする</Button>,
    document.getElementById('root'),
);
