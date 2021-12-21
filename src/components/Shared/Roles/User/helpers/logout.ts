import utils from 'utils'

type LogoutHandler = (clearSocket: () => void) => void

const logout: LogoutHandler = async clearSocket => {
    const url = '/api/global/auth/logout'
    const response = await utils.axios.get(url)
    if (response) {
        clearSocket()
        utils.setRole('guest')
        utils.history.push('/')
    }
}

export default logout
