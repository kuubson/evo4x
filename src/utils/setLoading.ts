import { store } from 'redux/store'

const setLoading = (loading: boolean) =>
    store.dispatch({
        type: 'setLoading',
        payload: loading
    })

export default setLoading
