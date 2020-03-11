import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const actions = {
    changeTab: actionCreator<number>('ACTIONS_CHANGE_TAB'),
    updateDraft: actionCreator<string>('ACTIONS_UPDATE_DRAFT'),
};
