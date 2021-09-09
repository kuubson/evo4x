import { store } from 'redux/store'

const setLoading = loading =>
    store.dispatch({
        type: 'setLoading',
        payload: loading
    })

export default setLoading
