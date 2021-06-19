import { types } from '../types/types'

const initialState = {
    ph: 0,
    user: null,
    temperature: 0
}

const poolStatus = ({ state, payload }) => ({
    ...state,
    ...payload
})

const actionDicts = {
    [types.poolStatus]: poolStatus,
}

export const poolReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}
