import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer, State } from './reducer';
import reduxThunk from 'redux-thunk';

export type AppState = {
    state: State;
};

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers<AppState>({
        state: reducer,
    }),
    storeEnhancers(applyMiddleware(reduxThunk)),
);

export default store;
