import { call, put, fork, take } from 'redux-saga/effects';
import { actions } from './actions';

export function getMyTimeline(param) {
    return fetch('/user_timeline/')
        .then(response => response.json())
        .then(data => {
            return { result: data };
        })
        .catch(error => {
            return { error };
        });
}

function* getTimelineHandler() {
    while (true) {
        const { payload } = yield take('ACTIONS_GET_TIMELINE_STARTED');
        const { result, error } = yield call(getMyTimeline, payload);
        console.log(result, 'hoge');
        if (result && !error) {
            yield put(actions.successGetTimeline({ result, params: {} }));
        } else {
            yield put(actions.failedGetTimeline({ error, params: {} }));
        }
    }
}

export function* sagas() {
    yield fork(getTimelineHandler);
}
