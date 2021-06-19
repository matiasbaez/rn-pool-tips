import { types } from '../types/types'
import { settings } from '../utils/api';
import { finishLoading, startLoading } from './ui';

export const startLogin = (email, password) => {
    return async (dispatch) => {

        dispatch( startLoading() )

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

        dispatch( finishLoading() )

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        dispatch( startLoading() )

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

        dispatch( finishLoading() )

    }
}

export const getUser = (access_token) => {
    return async (dispatch) => {

        dispatch( startLoading() )

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }

        const request = new Request(`${settings.host}/api/auth/user`, options)
        const response = await fetch(request);
        const data = await response.json();

        if (response.ok) {
            dispatch( userInfo(data) )
        }

        dispatch( finishLoading() )
    }
}

export const updateUser = (auth, body) => {
    return async (dispatch) => {

        dispatch( startLoading() )

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.access_token}`
            },
            body: JSON.stringify(body)
        }

        const request = new Request(`${settings.host}/api/user/${auth.user.id}`, options)
        const response = await fetch(request);
        const data = await response.json();

        if (response.ok) {
            dispatch( refreshToken(data.refreshToken) )
            dispatch( userInfo(data.user) )
        }

        dispatch( finishLoading() )
    }
}

export const startUploadImage = (auth, image) => {
    return async (dispatch) => {

        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('image', image);

        const options = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${auth.access_token}`
            },
            body: formData
        }

        const request = new Request(`${settings.host}/api/user/${auth.user.id}/upload-image`, options)
        const response = await fetch(request);
        const data = await response.json();

        if (response.ok) {
            dispatch( userInfo(data) )
        }

        dispatch( finishLoading() )
    }
}

export const startLogout = (access_token) => {
    return async (dispatch) => {

        dispatch( startLoading() )

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }

        const request = new Request(`${settings.host}/api/auth/logout`, options)
        const response = await fetch(request);

        if (response.ok) {
            dispatch( logout() )
        }

        dispatch( finishLoading() )
    }
}

export const login = (access_token, user) => ({
    type: types.login,
    payload: access_token
})

export const register = (access_token, user) => ({
    type: types.register,
    payload: access_token
})

export const userInfo = (user) => ({
    type: types.user,
    payload: user
})

export const refreshToken = (refresh_token) => ({
    type: types.refreshToken,
    payload: refresh_token
})

export const logout = () => ({
    type: types.logout,
})
