import { useEffect, useState } from 'react'

import hooks from 'hooks'

import helpSidebarHelpers from 'components/Guest/Home/composed/HelpSidebar/helpers'

type HelpSidebarHook = {
    toggleSidebar: () => void
    hideSidebar: () => void
    showLoginModal: () => void
}

const useHelpSidebar = ({ toggleSidebar, hideSidebar, showLoginModal }: HelpSidebarHook) => {
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
        helpSidebarHelpers.handleQueryParams({
            params,
            setIssue,
            toggleSidebar,
            showLoginModal
        })
    }, [])
    const handleHelpSidebar = (event: React.FormEvent) => {
        helpSidebarHelpers.handleHelpSidebar({
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
    const closeHelpSidebar = () => {
        setTimeout(() => setIssue(''), 600)
        toggleSidebar()
    }
    return {
        form,
        formHandler,
        issue,
        setIssue,
        handleHelpSidebar,
        closeHelpSidebar
    }
}

export default useHelpSidebar
