import { types } from '../types/types';

const initialState = {
    loading: false,
    msgError: null
}

const uiSetError = ({ state, payload }) => ({
    ...state,
    msgError: payload
})

const uiRemoveError = ({ state }) => ({
    ...state,
    msgError: null
})

const actionDicts = {
    [types.uiSetError]: uiSetError,
    [types.uiRemoveError]: uiRemoveError
}

export const uiReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}
