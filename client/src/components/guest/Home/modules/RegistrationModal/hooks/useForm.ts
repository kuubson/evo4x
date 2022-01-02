import { useState } from 'react'

import { useFormHandler } from 'hooks'

import { register as registerHelper } from '../helpers'

export const useForm = () => {
    const [form, setForm] = useState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const formHandler = useFormHandler(setForm)
    const register = (event: React.FormEvent) => {
        registerHelper({
            event,
            form,
            setForm,
            formHandler
        })
    }
    return {
        form,
        formHandler,
        register
    }
}
