import utils from 'utils'

type EmailAuthenticator = {
    emailToken: string | string[] | null
    handleToggler: (dispatcher: DispatchBoolean) => void
    setShowLoginModal: DispatchBoolean
}

const authenticateEmail = ({
    emailToken,
    handleToggler,
    setShowLoginModal
}: EmailAuthenticator) => {
    const authenticateEmail = async () => {
        try {
            handleToggler(setShowLoginModal)
            const url = '/api/user/auth/authenticateEmail'
            await utils.axios.post(url, {
                emailToken
            })
        } catch (error) {
            utils.handleApiError(error)
        }
    }
    if (emailToken) {
        authenticateEmail()
    }
}

export default authenticateEmail
