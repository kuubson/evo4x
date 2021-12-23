import utils from 'utils'

type EmailAuthenticator = {
    emailToken: string | string[] | null
    setShowLoginModal: DispatchBoolean
}

const authenticateEmail = ({ emailToken, setShowLoginModal }: EmailAuthenticator) => {
    const authenticateEmail = async () => {
        setShowLoginModal(true)
        const url = '/api/user/auth/authenticateEmail'
        await utils.axios.post(url, {
            emailToken
        })
    }
    if (emailToken) {
        authenticateEmail()
    }
}

export default authenticateEmail
