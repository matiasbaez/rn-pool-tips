import { types } from '../types/types'

const initialState = {
    access_token: null,
    user: null,
    logged: false
}

const login = ({ payload }) => ({
    access_token: payload.access_token,
    user: payload.user,
    logged: payload.logged
})

const register = ({ payload }) => ({
    access_token: payload.access_token,
    user: payload.user,
    logged: payload.logged
})

const logout = () => ({ logged: false })

const actionDicts = {
    [types.login]: login,
    [types.register]: register,
    [types.logout]: logout
}

export const authReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}
