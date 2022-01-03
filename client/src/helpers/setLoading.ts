import { store } from 'redux/store'

export const setLoading = (loading: boolean) => {
    store.dispatch({
        type: 'loader/setLoading',
        payload: loading
    })
}
