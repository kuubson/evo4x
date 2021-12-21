import { useEffect } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

const useSocket = () => {
    const { socket, setSocket, clearSocket } = hooks.useSocket()
    useEffect(() => {
        if (!socket) {
            setSocket(io('/admin'))
        }
    }, [])
    return {
        clearSocket
    }
}

export default useSocket
