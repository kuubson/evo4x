import { store } from 'redux/store'

const setApiFeedback = apiFeedback =>
    store.dispatch({
        type: 'setApiFeedback',
        payload: apiFeedback
    })

export default setApiFeedback
