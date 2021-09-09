import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loader from './loader'
import apiFeedback from './apiFeedback'

const rootReducer = combineReducers({
    loader,
    apiFeedback
})

export default rootReducer
