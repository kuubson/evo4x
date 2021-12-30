import { store } from 'redux/store'

import actions from 'redux/actions'

const setRole = (role: Role) =>
    store.dispatch({
        type: actions.SET_ROLE,
        payload: role
    })

export default setRole
