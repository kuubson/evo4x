import { store } from 'redux/store'

const setApiFeedback = (apiFeedback: string) =>
    store.dispatch({
        type: 'setApiFeedback',
        payload: apiFeedback
    })

export default setApiFeedback
