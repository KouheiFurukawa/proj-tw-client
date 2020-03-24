import * as React from 'react';
import { Button } from '@material-ui/core';

interface LoginProps {}

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
    return <Button href="http://localhost:3000/auth">Twitterアカウントでログインする</Button>;
};
