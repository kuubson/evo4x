import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import socket from './socket'
import loader from './loader'
import apiFeedback from './apiFeedback'
import role from './role'
import messagesInfo from './messagesInfo'

const roleConfig = {
    key: 'role',
    storage
}

const messagesConfig = {
    key: 'messagesInfo',
    storage
}

export const rootReducer = combineReducers({
    socket,
    loader,
    apiFeedback,
    role: persistReducer(roleConfig, role),
    messagesInfo: persistReducer(messagesConfig, messagesInfo)
})
