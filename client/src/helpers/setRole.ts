import { store } from 'redux/store'

export const setRole = (role: AllRoles) =>
    store.dispatch({
        type: 'role/setRole',
        payload: role
    })
