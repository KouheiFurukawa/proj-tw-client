import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';
import { configureStore } from './store';
import { initialState } from './reducer';

ReactDOM.render(
    <Provider store={configureStore({ state: initialState })}>
        <Application />
    </Provider>,
    document.getElementById('root'),
);
