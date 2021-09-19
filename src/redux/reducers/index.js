import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import apiFeedback from './apiFeedback'
import role from './role'
import messages from './messages'

const roleConfig = {
    key: 'role',
    storage
}

const messagesConfig = {
    key: 'messages',
    storage
}

const rootReducer = combineReducers({
    socket,
    loader,
    apiFeedback,
    role: persistReducer(roleConfig, role),
    messages: persistReducer(messagesConfig, messages)
})

export default rootReducer
