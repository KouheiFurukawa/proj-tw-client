import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface State {
    tabValue: number;
    textInput: string;
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
};

export const reducer = reducerWithInitialState(initialState)
    .case(actions.updateDraft, (state, textInput) => {
        return { ...state, textInput };
    })
    .case(actions.changeTab, (state, tabValue) => {
        return { ...state, tabValue };
    });
