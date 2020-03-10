import * as React from 'react';

interface Tweet {
    text: string;
    user: string;
}

interface ApplicationProps {
    timeline: Tweet[];
}

interface State {}

class Application extends React.Component<ApplicationProps, State> {
    render() {
        return (
            <div>
                {this.props.timeline.map(tweet => {
                    return (
                        <div>
                            <span>{tweet.user}</span>
                            <span>{tweet.text}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Application;
