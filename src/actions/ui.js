import { types } from '../types/types';

export const setError = (err) => ({
    type: types.uiSetError,
    payload: err
})

export const removeError = () => ({
    type: types.uiRemoveError,
})

export const startLoading = (err) => ({
    type: types.uiStartLoading,
})

export const finishLoading = (err) => ({
    type: types.uiFinishLoading,
})
