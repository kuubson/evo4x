import actions from 'redux/actions'

const initialState = {
    loading: false
}

type Action = {
    payload: boolean
    type: 'SET_LOADING'
}

const loader = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

export default loader
