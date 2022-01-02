import { axios } from 'utils'

type EmailAuthenticator = {
    emailToken: string | string[] | null
    setShowLoginModal: ReactDispatch<boolean>
}

export const authenticateEmail = ({ emailToken, setShowLoginModal }: EmailAuthenticator) => {
    const authenticateEmail = async () => {
        setShowLoginModal(true)
        const url = '/api/user/auth/authenticateEmail'
        await axios.post(url, {
            emailToken
        })
    }
    if (emailToken) {
        authenticateEmail()
    }
}
