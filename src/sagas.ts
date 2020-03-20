import { call, put, fork, take } from 'redux-saga/effects';
import { actions } from './actions';
import ApiClient from './apiClient';

function* getTimelineHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_TIMELINE_STARTED');
        const { result, error } = yield call(ApiClient.getMyTimeline);
        if (result && !error) {
            yield put(actions.successGetTimeline({ result, params: {} }));
        } else {
            yield put(actions.failedGetTimeline({ error, params: {} }));
        }
    }
}

function* getUserTimelineHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_USER_TIMELINE_STARTED');
        const { result, error } = yield call(ApiClient.getUserTimeline, payload);
        if (result && !error) {
            yield put(actions.requestTimeline({}));
            yield put(actions.successGetUserTimeline({ result, params: {} }));
        } else {
            yield put(actions.failedGetUserTimeline({ error, params: {} }));
        }
    }
}

function* postTweetHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_POST_TWEET_STARTED');
        const { result, error } = yield call(ApiClient.postTweet, payload);
        if (result && !error) {
            yield put(actions.requestTimeline({}));
            yield put(actions.successPostTweet({ result, params: payload }));
        } else {
            yield put(actions.failedPostTweet({ error, params: payload }));
        }
    }
}

function* getFavoritesListHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_FAVORITES_LIST_STARTED');
        const { result, error } = yield call(ApiClient.getFavoritesList, payload);
        if (result && !error) {
            yield put(actions.successGetFavoritesList({ result, params: payload }));
        } else {
            yield put(actions.failedGetFavoritesList({ error, params: payload }));
        }
    }
}

function* likeHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_LIKE_STARTED');
        const { result, error } = yield call(ApiClient.like, payload);
        if (result && !error) {
            yield put(actions.successLike({ result, params: payload }));
        } else {
            yield put(actions.failedLike({ error, params: payload }));
        }
    }
}

function* retweetHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_RETWEET_STARTED');
        const { result, error } = yield call(ApiClient.retweet, payload);
        if (result && !error) {
            yield put(actions.requestTimeline({}));
            yield put(actions.requestUserTimeline('Cygnus_x_l'));
            yield put(actions.successRetweet({ result, params: payload }));
        } else {
            yield put(actions.failedRetweet({ error, params: payload }));
        }
    }
}

function* searchHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_SEARCH_STARTED');
        const { result, error } = yield call(ApiClient.search, payload);
        if (result && !error) {
            yield put(actions.successSearch({ result, params: payload }));
        } else {
            yield put(actions.failedSearch({ error, params: payload }));
        }
    }
}

export function* sagas() {
    yield fork(getTimelineHandler);
    yield fork(getUserTimelineHandler);
    yield fork(postTweetHandler);
    yield fork(getFavoritesListHandler);
    yield fork(likeHandler);
    yield fork(retweetHandler);
    yield fork(searchHandler);
}
