import { types } from '../types/types'
import { settings } from '../utils/api';

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        const request = new Request(`${settings.host}/api/auth/signin`, options)
        const response = await fetch(request);
        const data = await response.json();

        if (response.ok) {
            const { access_token, user } = data;
            dispatch( login(access_token, user) )
        }
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, password_confirmation: password})
        }

        const request = new Request(`${settings.host}/api/auth/signup`, options)
        const response = await fetch(request);
        const data = await response.json();

        if (response.ok) {
            const { access_token, user } = data;
            dispatch( login(access_token, user) )
        }
    }
}

export const login = (access_token, user) => ({
    type: types.login,
    payload: {
        access_token,
        user,
        logged: true
    }
})

export const register = (access_token, user) => ({
    type: types.register,
    payload: {
        access_token,
        user,
        logged: false
    }
})
