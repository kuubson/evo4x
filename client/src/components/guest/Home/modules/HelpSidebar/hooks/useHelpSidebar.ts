import { useEffect, useState } from 'react'

import * as hooks from 'hooks'

import * as helpers from '../helpers'

type HelpSidebarHook = {
    toggleSidebar: () => void
    hideSidebar: () => void
    showLoginModal: () => void
}

export const useHelpSidebar = ({ toggleSidebar, hideSidebar, showLoginModal }: HelpSidebarHook) => {
    const params = hooks.useQueryParams()
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const formHandler = hooks.useFormHandler(setForm)
    const [issue, setIssue] = useState<Issue>('')
    useEffect(() => {
        helpers.handleQueryParams({
            params,
            setIssue,
            toggleSidebar,
            showLoginModal
        })
    }, [])
    const handleHelpSidebar = (event: React.FormEvent) => {
        helpers.handleHelpSidebar({
            event,
            form,
            passwordToken: params.passwordToken,
            setForm,
            formHandler,
            issue,
            setIssue,
            hideSidebar,
            showLoginModal
        })
    }
    return {
        form,
        formHandler,
        issue,
        setIssue,
        handleHelpSidebar
    }
}
