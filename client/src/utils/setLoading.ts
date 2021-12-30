import { store } from 'redux/store'

import actions from 'redux/actions'

const setLoading = (loading: boolean) =>
    store.dispatch({
        type: actions.SET_LOADING,
        payload: loading
    })

export default setLoading
