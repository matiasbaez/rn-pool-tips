import { types } from '../types/types';

export const deviceState = (payload) => ({
    type: types.deviceState,
    payload
})

export const notification = (payload) => ({
    type: types.notifReceived,
    payload
})
