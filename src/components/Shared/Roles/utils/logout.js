import utils from 'utils'

const logout = async (socket, setSocket) => {
    const url = '/api/global/logout'
    const response = await utils.axios.get(url)
    if (response) {
        socket.disconnect()
        setSocket(undefined)
        utils.setRole('guest')
        utils.history.push('/')
    }
}

export default logout
