import { Socket } from 'socket.io-client'

import utils from 'utils'

type SocketSetter = (payload: Socket | undefined) => object

const logout = async (socket: Socket | undefined, setSocket: SocketSetter) => {
    const url = '/api/global/auth/logout'
    const response = await utils.axios.get(url)
    if (response) {
        socket!.disconnect()
        setSocket(undefined)
        utils.setRole('guest')
        utils.history.push('/')
    }
}

export default logout
