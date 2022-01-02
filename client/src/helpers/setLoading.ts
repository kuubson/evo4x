import { store } from 'redux/store'

export const setLoading = (loading: string) => {
    store.dispatch({
        type: 'setLoading',
        payload: loading
    })
}
