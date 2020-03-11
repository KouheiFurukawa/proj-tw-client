import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';

const tweets = [];

ReactDOM.render(
    <div>
        <Application timeline={tweets ? tweets : []} />
    </div>,
    document.getElementById('root'),
);
