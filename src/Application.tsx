import * as React from 'react';
import Container from './container/Container';

const Application: React.FC = () => {
    // constructor(props) {
    //     super(props);
    //     this.getTweet = this.getTweet.bind(this);
    //     this.getMyTweet = this.getMyTweet.bind(this);
    //     this.onChangeTab = this.onChangeTab.bind(this);
    //     this.state = {
    //         timeline: [],
    //         myTimeline: [],
    //         tabValue: 0,
    //     };
    // }
    //
    //
    // getMyTweet() {
    //     fetch('/user_timeline/')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             data.forEach(d => {
    //                 const tl = this.state.myTimeline;
    //                 tl.push(d);
    //                 this.setState({ myTimeline: tl });
    //             });
    //         })
    //         .catch(error => console.log(error));
    // }
    //
    // onChangeTab(e, tabval) {
    //     this.setState({ ...this.state, tabValue: tabval });
    // }
    //
    // componentDidMount() {
    //     this.getTweet();
    //     this.getMyTweet();
    // }

    return (
        <React.Fragment>
            <Container />
        </React.Fragment>
    );
};

export default Application;
