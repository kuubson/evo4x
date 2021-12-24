import { useEffect } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

import adminHelpers from '../helpers'

const useHelpers = () => {
    const { socket, setSocket, clearSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    useEffect(() => {
        if (!socket) {
            setSocket(io('/admin'))
        }
        adminHelpers.checkRole(role)
    }, [])
    return {
        clearSocket
    }
}

export default useHelpers
