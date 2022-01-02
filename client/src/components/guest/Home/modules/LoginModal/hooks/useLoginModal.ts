import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { setRole, handleApiValidation } from 'helpers'

import { axios, history } from 'utils'

type FormHook = {
    role: UserRoles
}

export const useLoginModal = ({ role }: FormHook) => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const formHandler = useFormHandler(setForm)
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        const { email, password } = form
        if (!formHandler.validateEmail(email)) validated = false
        if (!formHandler.validatePassword(password, '', true)) validated = false
        return validated
    }
    const login = async (event: React.FormEvent) => {
        event.preventDefault()
        if (validate()) {
            try {
                const url = `/api/${role}/auth/login`
                const { email, password } = form
                const response = await axios.post(url, {
                    email,
                    password
                })
                if (response) {
                    setRole(role)
                    history.push(role === 'admin' ? '/admin/analysis' : '/user/profile')
                }
            } catch (error) {
                handleApiValidation(error, setForm)
            }
        }
    }
    return {
        form,
        formHandler,
        login
    }
}
