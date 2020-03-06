import * as React from 'react';

interface tweet {
    text: string,
    user: string,
}

interface applicationProps {
    timeline: tweet[],
}

interface State {
}


class Application extends React.Component<applicationProps, State> {
    render() {
        return (
            <div>
                {this.props.timeline.map((tweet) => {
                    return (
                        <div>
                            <span>{tweet.user}</span>
                            <span>{tweet.text}</span>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Application;
