const initialState = {
    loading: false
}

const loader = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setLoading':
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

export default loader
