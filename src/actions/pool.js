import { types } from '../types/types';
import { settings } from '../utils/api';
import { finishLoading, startLoading } from './ui';

export const getPoolStatus = (access_token, query = {}) => {
    return async (dispatch) => {

        dispatch( startLoading() )
    
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }
    
        const request = new Request(`${settings.host}/api/pool`, options)
        const response = await fetch(request)
        const json = await response.json()
    
        if (response.ok) {
            dispatch( pool(json.data[0]) );
        }
    
        dispatch( finishLoading() )
    }
}

export const pool = (status) => ({
    type: types.poolStatus,
    payload: status
})
