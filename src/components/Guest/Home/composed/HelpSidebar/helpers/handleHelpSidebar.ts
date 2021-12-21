import utils from 'utils'

import helpSidebarHelpers from '.'

export type Form = {
    email: string
    emailError: string
    password: string
    passwordError: string
    repeatedPassword: string
    repeatedPasswordError: string
}

type HelpSidebarHandler = {
    event: React.FormEvent
    form: Form
    passwordToken: string | string[] | null
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
    issue: Issue
    setIssue: React.Dispatch<React.SetStateAction<Issue>>
    hideSidebar: () => void
    showLoginModal: () => void
}

const handleHelpSidebar = async ({
    event,
    form,
    passwordToken,
    setForm,
    formHandler,
    issue,
    setIssue,
    hideSidebar,
    showLoginModal
}: HelpSidebarHandler) => {
    event.preventDefault()
    if (
        helpSidebarHelpers.validate({
            form,
            setForm,
            issue,
            formHandler
        })
    ) {
        try {
            if (issue === 'changePassword') {
                const url = '/api/user/auth/changePassword'
                const { password, repeatedPassword } = form
                const response = await utils.axios.post(url, {
                    password,
                    repeatedPassword,
                    passwordToken
                })
                if (response) {
                    setIssue('')
                    hideSidebar()
                    showLoginModal()
                }
            } else {
                const url = `/api/user/auth/${
                    issue === 'password' ? 'requestPasswordChange' : 'resendEmail'
                }`
                const { email } = form
                await utils.axios.post(url, {
                    email
                })
            }
        } catch (error) {
            utils.handleApiValidation(error, setForm)
        }
    }
}

export default handleHelpSidebar
