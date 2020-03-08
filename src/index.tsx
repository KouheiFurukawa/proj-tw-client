import * as React from 'react';
import * as ReactDOM from 'react-dom';
import application from './application';
import { getTweets } from '../api';

const tweets = getTweets('akio_utsuroido', 20);

ReactDOM.render(
    <div>
        <Application timeline={tweets ? tweets : []} />
    </div>,
    document.getElementById('root'));
