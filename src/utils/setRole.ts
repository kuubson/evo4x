import { store } from 'redux/store'

const setRole = (role: 'admin' | 'user' | 'guest') =>
    store.dispatch({
        type: 'setRole',
        payload: role
    })

export default setRole
