import { setRole } from 'helpers'

import { axios, history } from 'utils'

export const logout = async (closeSocketConnection: () => void) => {
    const url = '/api/global/auth/logout'
    const response = await axios.get(url)
    if (response) {
        closeSocketConnection()
        sessionStorage.clear()
        setRole('guest')
        history.push('/')
    }
}
