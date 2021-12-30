import actions from 'redux/actions'

const initialState = {
    apiFeedback: ''
}

type Action = {
    payload: string
    type: 'SET_API_FEEDBACK'
}

const apiFeedback = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.SET_API_FEEDBACK:
            return {
                ...state,
                apiFeedback: payload
            }
        default:
            return state
    }
}

export default apiFeedback
