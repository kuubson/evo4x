import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import apiFeedback from './apiFeedback'
import loader from './loader'
import messagesInfo from './messagesInfo'
import role from './role'
import socket from './socket'

const roleConfig = {
   key: 'role',
   storage,
}

const messagesConfig = {
   key: 'messagesInfo',
   storage,
}

export const rootReducer = combineReducers({
   socket,
   loader,
   apiFeedback,
   role: persistReducer(roleConfig, role),
   messagesInfo: persistReducer(messagesConfig, messagesInfo),
})
