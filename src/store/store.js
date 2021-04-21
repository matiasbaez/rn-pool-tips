
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { loadState, saveState } from '../actions/localStorage';

import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Define multiple reducers
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

const initialData = loadState()

export const store = createStore(
    reducers,
    initialData,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.subscribe( function () {
    saveState(store.getState())
})