import * as React from 'react';
import { Handler } from './container/Container';
import { Tab, Tabs, TextField, Button } from '@material-ui/core';
import { State } from './reducer';
import { actions } from './actions';
import { useDispatch } from 'react-redux';
import Tweet from './Tweet';
import Search from './Search';

interface OwnProps {}

type MainProps = OwnProps & Handler & State;

export const Main: React.FC<MainProps> = (props: MainProps) => {
    React.useEffect(() => {
        dispatch(actions.requestUserTimeline('Cygnus_x_l'));
        dispatch(actions.requestTimeline({}));
        dispatch(actions.requestFavoritesList('Cygnus_x_l'));
        console.log(props);
    }, []);

    const dispatch = useDispatch();
    return (
        <div>
            <Tabs
                value={props.tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newVal) => props.handleOnChangeTab(newVal)}
            >
                <Tab label="timeline" value={0} />
                <Tab label="my tweet" value={1} />
                <Tab label="tweet" value={2} />
                <Tab label="search" value={3} />
            </Tabs>
            {props.tabValue === 0 &&
                props.timeline.map(tweet => {
                    return <Tweet key={tweet.id} tweet={tweet} />;
                })}
            {props.tabValue === 1 &&
                props.myTimeline.map(tweet => {
                    return <Tweet key={tweet.id} tweet={tweet} />;
                })}
            {props.tabValue === 2 && (
                <div>
                    <TextField
                        multiline
                        rows={4}
                        label="Tweet"
                        value={props.textInput}
                        onChange={e => props.handleOnChangeText(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={e => props.handlePostTweet(props.textInput)}>
                        Tweet
                    </Button>
                    <Button variant="contained" color="primary" href="http://localhost:3000/logout">
                        Tweet
                    </Button>
                </div>
            )}
            {props.tabValue === 3 && <Search />}
        </div>
    );
};
