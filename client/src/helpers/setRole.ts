import { store } from 'redux/store'

export const setRole = (role: Role) =>
    store.dispatch({
        type: 'setRole',
        payload: role
    })
