import { store } from 'redux/store'

export const setApiFeedback = (apiFeedback: string) => {
    store.dispatch({
        type: 'apiFeedback/setApiFeedback',
        payload: apiFeedback
    })
}
