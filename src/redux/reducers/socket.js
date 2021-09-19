const initialState = {
    socket: undefined
}

const socket = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setSocket':
            return {
                ...state,
                socket: payload
            }
        default:
            return state
    }
}

export default socket
