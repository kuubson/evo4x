import { setRole } from 'helpers'

import * as utils from 'utils'

export const logout = async (closeSocketConnection: () => void) => {
    const url = '/api/global/auth/logout'
    const response = await utils.axios.get(url)
    if (response) {
        closeSocketConnection()
        sessionStorage.clear()
        setRole('guest')
        utils.history.push('/')
    }
}
