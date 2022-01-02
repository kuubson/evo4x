import { useState, useEffect } from 'react'

import { useQueryParams, useFormHandler } from 'hooks'

import { handleApiValidation } from 'helpers'

import { axios } from 'utils'

type HelpSidebarHook = {
    toggleSidebar: () => void
    hideSidebar: () => void
    showLoginModal: () => void
}

export const useHelpSidebar = ({ toggleSidebar, hideSidebar, showLoginModal }: HelpSidebarHook) => {
    const { failedAuthentication, passwordToken } = useQueryParams()
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const formHandler = useFormHandler(setForm)
    const [issue, setIssue] = useState<Issue>('')
    useEffect(() => {
        if (failedAuthentication) {
            showLoginModal()
        }
        if (passwordToken) {
            setIssue('changePassword')
            toggleSidebar()
        }
    }, [])
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        if (issue === 'changePassword') {
            const { password, repeatedPassword } = form
            if (!formHandler.validatePassword(password, '', false)) validated = false
            if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
        } else {
            const { email } = form
            if (!formHandler.validateEmail(email)) validated = false
        }
        return validated
    }
    const handleHelpSidebar = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
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
    const issues = [
        {
            issue: 'Have not you received any e-mail?',
            active: issue === 'email',
            handleOnClick: () => setIssue('email')
        },
        {
            issue: 'Has the link to authenticate your email address expired?',
            active: issue === 'link',
            handleOnClick: () => setIssue('link')
        },
        {
            issue: 'Did you forget the password?',
            active: issue === 'password',
            handleOnClick: () => setIssue('password')
        }
    ]
    return {
        form,
        formHandler,
        issue,
        setIssue,
        handleHelpSidebar,
        issues
    }
}
