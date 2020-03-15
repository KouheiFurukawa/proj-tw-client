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

function* getDMHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_DIRECT_MESSAGE_STARTED');
        const { result, error } = yield call(ApiClient.getDM);
        if (result && error) {
            yield put(actions.successGetDM({ result, params: null }));
        } else {
            yield put(actions.failedGetDM({ error, params: null }));
        }
    }
}

export function* sagas() {
    yield fork(getTimelineHandler);
    yield fork(getUserTimelineHandler);
    yield fork(postTweetHandler);
    yield fork(getDMHandler);
}
