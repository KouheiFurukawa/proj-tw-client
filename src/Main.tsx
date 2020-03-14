import * as React from 'react';
import { Handler } from './container/Container';
import { Tab, Tabs } from '@material-ui/core';
import { State } from './reducer';
import { actions } from './actions';
import { useDispatch } from 'react-redux';

interface OwnProps {}

type MainProps = OwnProps & Handler & State;

export const Main: React.FC<MainProps> = (props: MainProps) => {
    React.useEffect(() => {
        dispatch(actions.requestUserTimeline('Cygnus_x_l'));
        dispatch(actions.requestTimeline({}));
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
            </Tabs>
            {props.tabValue === 0
                ? props.timeline.map(tweet => {
                      return (
                          <div>
                              <div>{tweet.user.created_at}</div>
                              <div>{tweet.text}</div>
                          </div>
                      );
                  })
                : props.myTimeline.map(tweet => {
                      return (
                          <div>
                              <div>{tweet.user.created_at}</div>
                              <div>{tweet.text}</div>
                          </div>
                      );
                  })}
        </div>
    );
};
