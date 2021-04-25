import { types } from '../types/types';

const initialState = {
    isSubscribed: false,
    notification: null
}

const deviceState = ({ state, payload }) => ({
    ...state,
    isSubscribed: payload
})

const notification = ({ state, payload }) => ({
    ...state,
    notification: payload
})

const actionDicts = {
    [types.deviceState]: deviceState,
    [types.notifReceived]: notification,
}

export const notificationReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}