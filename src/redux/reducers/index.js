import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import loader from './loader'
import apiFeedback from './apiFeedback'
import role from './role'

const roleConfig = {
    key: 'role',
    storage
}

const rootReducer = combineReducers({
    loader,
    apiFeedback,
    role: persistReducer(roleConfig, role)
})

export default rootReducer
