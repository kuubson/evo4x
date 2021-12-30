import { useEffect } from 'react'

import hooks from 'hooks'

import homeHelpers from '../helpers'

type HelpersHook = {
    setShowLoginModal: DispatchBoolean
}

const useHelpers = ({ setShowLoginModal }: HelpersHook) => {
    const { emailToken } = hooks.useQueryParams()
    useEffect(() => {
        homeHelpers.authenticateEmail({
            emailToken,
            setShowLoginModal
        })
    }, [emailToken])
    const handleToggler = (dispatcher: DispatchBoolean) => dispatcher(state => !state)
    return {
        handleToggler
    }
}

export default useHelpers
