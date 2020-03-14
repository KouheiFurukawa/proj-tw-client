import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../actions';
import { AppState } from '../store';
import { Main } from '../Main';

export interface Handler {
    handleOnChangeText(text: string): void;
    handlePostTweet(content: string): void;
    handleOnChangeTab(value: number): void;
}

const mapStateToProps = (appState: AppState) => {
    return {
        tabValue: appState.state.tabValue,
        textInput: appState.state.textInput,
        timeline: appState.state.timeline,
        myTimeline: appState.state.myTimeline,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeText(text: string): void {
            dispatch(actions.updateDraft(text));
        },
        handlePostTweet(content: string): void {
            dispatch(actions.requestPostTweet(content));
        },
        handleOnChangeTab(value: number): void {
            dispatch(actions.changeTab(value));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
