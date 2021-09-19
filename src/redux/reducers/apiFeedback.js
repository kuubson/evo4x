const initialState = {
    apiFeedback: ''
}

const apiFeedback = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setApiFeedback':
            return {
                ...state,
                apiFeedback: payload
            }
        default:
            return state
    }
}

export default apiFeedback
