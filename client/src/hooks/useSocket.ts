import { Socket } from 'socket.io-client'

import { useAppDispatch, useAppSelector } from 'redux/hooks'

import { setSocket as setSocketAction } from 'redux/reducers/socket'

export const useSocket = () => {
    const dispatch = useAppDispatch()
    const { socket } = useAppSelector(state => state.socket)
    const setSocket = (payload: null | Socket) => dispatch(setSocketAction(payload))
    const clearSocket = () => {
        if (socket) {
            socket.disconnect()
            setSocket(null)
        }
    }
    return {
        socket,
        setSocket,
        clearSocket
    }
}
