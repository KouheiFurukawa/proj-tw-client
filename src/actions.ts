import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const getTimeline = actionCreator.async<{}, any[], Error>('ACTIONS_GET_TIMELINE');
export const getUserTimeline = actionCreator.async<{}, any[], Error>('ACTIONS_GET_USER_TIMELINE');
export const postTweet = actionCreator.async<string, any[], Error>('ACTIONS_POST_TWEET');
export const getFavoritesList = actionCreator.async<string, any[], Error>('ACTIONS_GET_FAVORITES_LIST');
export const like = actionCreator.async<string, any[], Error>('ACTIONS_LIKE');
export const retweet = actionCreator.async<string, any[], Error>('ACTIONS_RETWEET');
export const search = actionCreator.async<{ query: string; product: string }, { results: any[] }, Error>(
    'ACTIONS_SEARCH',
);

export const actions = {
    changeTab: actionCreator<number>('ACTIONS_CHANGE_TAB'),
    updateDraft: actionCreator<string>('ACTIONS_UPDATE_DRAFT'),
    changeSearch: actionCreator<string>('ACTIONS_CHANGE_SEARCH'),
    requestPostTweet: postTweet.started,
    failedPostTweet: postTweet.failed,
    successPostTweet: postTweet.done,
    requestTimeline: getTimeline.started,
    failedGetTimeline: getTimeline.failed,
    successGetTimeline: getTimeline.done,
    requestUserTimeline: getUserTimeline.started,
    failedGetUserTimeline: getUserTimeline.failed,
    successGetUserTimeline: getUserTimeline.done,
    requestLike: like.started,
    failedLike: like.failed,
    successLike: like.done,
    requestFavoritesList: getFavoritesList.started,
    failedGetFavoritesList: getFavoritesList.failed,
    successGetFavoritesList: getFavoritesList.done,
    requestRetweet: retweet.started,
    failedRetweet: retweet.failed,
    successRetweet: retweet.done,
    requestSearch: search.started,
    failedSearch: search.failed,
    successSearch: search.done,
};
