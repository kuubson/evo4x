import { store } from 'redux/store'

const setRole = role =>
    store.dispatch({
        type: 'setRole',
        payload: role
    })

export default setRole
