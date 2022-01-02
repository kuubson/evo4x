import { handleApiValidation } from 'helpers'

import { axios } from 'utils'

import { validate } from '.'

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
    setForm: ReactDispatch<Form>
    formHandler: any
    issue: Issue
    setIssue: ReactDispatch<Issue>
    hideSidebar: () => void
    showLoginModal: () => void
}

export const handleHelpSidebar = async ({
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
        validate({
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
                const response = await axios.post(url, {
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
                await axios.post(url, {
                    email
                })
            }
        } catch (error) {
            handleApiValidation(error, setForm)
        }
    }
}
