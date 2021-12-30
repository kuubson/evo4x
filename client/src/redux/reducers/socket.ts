import { Socket } from 'socket.io-client'

import actions from 'redux/actions'

type State = {
    socket: Socket | undefined
}

const initialState: State = {
    socket: undefined
}

type Action = {
    payload: Socket
    type: 'SET_SOCKET'
}

const socket = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.SET_SOCKET:
            return {
                ...state,
                socket: payload
            }
        default:
            return state
    }
}

export default socket
