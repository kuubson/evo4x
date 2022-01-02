import { store } from 'redux/store'

export const setApiFeedback = (apiFeedback: string) => {
    store.dispatch({
        type: 'setApiFeedback',
        payload: apiFeedback
    })
}
