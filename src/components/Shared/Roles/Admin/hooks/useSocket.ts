import { useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

import hooks from 'hooks'

const useSocket = () => {
    const { socket, setSocket } = hooks.useSocket()
    useEffect(() => {
        if (!socket) {
            setSocket(io('/admin'))
        }
    }, [])
    return {
        socket,
        setSocket
    }
}

export default useSocket
