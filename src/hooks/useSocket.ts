import { Socket } from 'socket.io-client'

import { useAppDispatch, useAppSelector } from 'redux/hooks'

import actions from 'redux/actions'

const useSocket = () => {
    const dispatch = useAppDispatch()
    const { socket } = useAppSelector(state => state.socket)
    const setSocket = (payload: Socket | undefined) =>
        dispatch({
            type: actions.SET_SOCKET,
            payload
        })
    return [socket, setSocket]
}

export default useSocket
