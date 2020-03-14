import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface State {
    tabValue: number;
    textInput: string;
    timeline: any[];
    myTimeline: any[];
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
    timeline: [],
    myTimeline: [],
};

export const reducer = reducerWithInitialState(initialState)
    .case(actions.updateDraft, (state, textInput) => {
        return { ...state, textInput };
    })
    .case(actions.changeTab, (state, tabValue) => {
        return { ...state, tabValue };
    })
    .case(actions.requestPostTweet, (state, content) => {
        return { ...state };
    })
    .case(actions.failedPostTweet, (state, content) => {
        return { ...state };
    })
    .case(actions.successPostTweet, (state, content) => {
        return { ...state, textInput: '', tabValue: 0 };
    })
    .case(actions.requestTimeline, state => {
        return { ...state };
    })
    .case(actions.failedGetTimeline, state => {
        return { ...state };
    })
    .case(actions.successGetTimeline, (state, action) => {
        return { ...state, timeline: action.result };
    })
    .case(actions.requestUserTimeline, state => {
        return { ...state };
    })
    .case(actions.failedGetUserTimeline, state => {
        return { ...state };
    })
    .case(actions.successGetUserTimeline, (state, action) => {
        return { ...state, myTimeline: action.result };
    });
