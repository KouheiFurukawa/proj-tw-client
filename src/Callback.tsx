import * as React from 'react';
import ApiClient from './apiClient';
import * as H from 'history';

interface CallbackProps {
    location: H.Location;
    history: H.History;
}

export const Callback: React.FC<CallbackProps> = (props: CallbackProps) => {
    React.useEffect(() => {
        ApiClient.callback(props.location.search)
            .then(data => {
                console.log(data);
                props.history.push('/');
            })
            .catch(err => console.error(err));
    }, []);
    return <React.Fragment>This is a callback page.</React.Fragment>;
};
