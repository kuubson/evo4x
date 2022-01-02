import { setRole } from 'helpers'

import { axios, history } from 'utils'

export const logout = async (callback: () => void) => {
    const url = '/api/global/auth/logout'
    const response = await axios.get(url)
    if (response) {
        sessionStorage.clear()
        setRole('guest')
        history.push('/')
        callback()
    }
}
