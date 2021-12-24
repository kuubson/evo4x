import { useEffect } from 'react'

import hooks from 'hooks'

import guestHelpers from 'components/Shared/Roles/Guest/helpers'

const useHelpers = () => {
    const { role } = hooks.useRole()
    const checkRole = () => {
        guestHelpers.checkRole(role)
    }
    useEffect(() => {
        checkRole()
    }, [])
}

export default useHelpers
