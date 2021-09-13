const initialState = {
    role: false
}

const role = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setRole':
            return {
                ...state,
                role: payload
            }
        default:
            return state
    }
}

export default role
