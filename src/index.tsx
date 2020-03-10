import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './Application';
import { getTweets } from '../api';

const tweets = getTweets('akio_utsuroido', 20);

ReactDOM.render(
    <div>
        <Application timeline={tweets ? tweets : []} />
    </div>,
    document.getElementById('root'),
);
