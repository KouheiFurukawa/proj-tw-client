import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface State {
    tabValue: number,
    textInput: string,
}

export const initialState: State = {
    tabValue: 0,
    textInput: '',
};

export const reducer = reducerWithInitialState(initialState);
