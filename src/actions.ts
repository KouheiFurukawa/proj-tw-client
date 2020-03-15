import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const getTimeline = actionCreator.async<{}, any[], Error>('ACTIONS_GET_TIMELINE');
export const getUserTimeline = actionCreator.async<{}, any[], Error>('ACTIONS_GET_USER_TIMELINE');
export const postTweet = actionCreator.async<string, any[], Error>('ACTIONS_POST_TWEET');
export const getDM = actionCreator.async<null, any[], Error>('ACTIONS_GET_DIRECT_MESSAGE');

export const actions = {
    changeTab: actionCreator<number>('ACTIONS_CHANGE_TAB'),
    updateDraft: actionCreator<string>('ACTIONS_UPDATE_DRAFT'),
    requestPostTweet: postTweet.started,
    failedPostTweet: postTweet.failed,
    successPostTweet: postTweet.done,
    requestTimeline: getTimeline.started,
    failedGetTimeline: getTimeline.failed,
    successGetTimeline: getTimeline.done,
    requestUserTimeline: getUserTimeline.started,
    failedGetUserTimeline: getUserTimeline.failed,
    successGetUserTimeline: getUserTimeline.done,
    requestGetDM: getDM.started,
    failedGetDM: getDM.failed,
    successGetDM: getDM.done,
};
