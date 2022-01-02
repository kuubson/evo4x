import { useState } from 'react'

import { useFormHandler } from 'hooks'

import * as helpers from 'helpers'

import * as utils from 'utils'

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
                const response = await utils.axios.post(url, {
                    email,
                    password
                })
                if (response) {
                    helpers.setRole(role)
                    utils.history.push(role === 'admin' ? '/admin/analysis' : '/user/profile')
                }
            } catch (error) {
                helpers.handleApiValidation(error, setForm)
            }
        }
    }
    return {
        form,
        formHandler,
        login
    }
}
