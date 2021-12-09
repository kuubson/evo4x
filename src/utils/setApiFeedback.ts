import { store } from 'redux/store'

import actions from 'redux/actions'

const setApiFeedback = (apiFeedback: string) =>
    store.dispatch({
        type: actions.SET_API_FEEDBACK,
        payload: apiFeedback
    })

export default setApiFeedback
