import { types } from '../types/types'

const initialState = {
    access_token: null,
    user: null,
    logged: false
}

const login = ({ state, payload }) => ({
    ...state,
    access_token: payload,
    logged: true
})

const register = ({ state, payload }) => ({
    ...state,
    access_token: payload,
    logged: true
})

const userInfo = ({ state, payload }) => ({
    ...state,
    user: payload
})

const logout = () => ({ logged: false })

const actionDicts = {
    [types.login]: login,
    [types.register]: register,
    [types.user]: userInfo,
    [types.logout]: logout
}

export const authReducer = (state = initialState, action) => {
    const selection = actionDicts[action.type];
    return selection ? selection({ state, payload: action.payload }) : state;
}
