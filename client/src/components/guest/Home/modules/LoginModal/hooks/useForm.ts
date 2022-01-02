import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { login as loginHelper } from '../helpers'

type FormHook = {
    role: Role
}

export const useForm = ({ role }: FormHook) => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const formHandler = useFormHandler(setForm)
    const login = (event: React.FormEvent) => {
        loginHelper({
            event,
            role,
            form,
            setForm,
            formHandler
        })
    }
    return {
        form,
        formHandler,
        login
    }
}
