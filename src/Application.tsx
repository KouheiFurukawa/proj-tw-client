import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';

interface Tweet {
    text: string;
    user: string;
}

interface ApplicationProps {
    timeline: Tweet[];
}

interface State {
    timeline: any[];
    myTimeline: any[];
    tabValue: number;
}

class Application extends React.Component<ApplicationProps, State> {
    constructor(props) {
        super(props);
        this.getTweet = this.getTweet.bind(this);
        this.getMyTweet = this.getMyTweet.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.state = {
            timeline: [],
            myTimeline: [],
            tabValue: 0,
        };
    }

    getTweet() {
        fetch('/timeline/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(d => {
                    const tl = this.state.timeline;
                    tl.push(d);
                    this.setState({ timeline: tl });
                });
            })
            .catch(error => console.log(error));
    }

    getMyTweet() {
        fetch('/user_timeline/')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(d => {
                    const tl = this.state.myTimeline;
                    tl.push(d);
                    this.setState({ myTimeline: tl });
                });
            })
            .catch(error => console.log(error));
    }

    onChangeTab(e, tabval) {
        this.setState({ ...this.state, tabValue: tabval });
    }

    componentDidMount() {
        this.getTweet();
        this.getMyTweet();
    }

    render() {
        return (
            <div>
                <Tabs
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.onChangeTab}
                >
                    <Tab label="timeline" value={0} />
                    <Tab label="my tweet" value={1} />
                </Tabs>
                {this.state.tabValue === 0
                    ? this.state.timeline.map(tweet => {
                          return (
                              <div>
                                  <div>{tweet.user.created_at}</div>
                                  <div>{tweet.text}</div>
                              </div>
                          );
                      })
                    : this.state.myTimeline.map(tweet => {
                          return (
                              <div>
                                  <div>{tweet.user.created_at}</div>
                                  <div>{tweet.text}</div>
                              </div>
                          );
                      })}
            </div>
        );
    }
}

export default Application;
