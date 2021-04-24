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

const uiStartLoading = ({ state }) => ({
    ...state,
    loading: true
})

const uiFinishLoading = ({ state }) => ({
    ...state,
    loading: false
})

const actionDicts = {
    [types.uiSetError]: uiSetError,
    [types.uiRemoveError]: uiRemoveError,
    [types.uiStartLoading]: uiStartLoading,
    [types.uiFinishLoading]: uiFinishLoading
}

export const uiReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}
