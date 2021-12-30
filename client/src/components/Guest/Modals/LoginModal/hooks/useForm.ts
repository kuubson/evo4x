import { useState } from 'react'

import hooks from 'hooks'

import loginModalHelpers from '../helpers'

type FormHook = {
    role: Role
}

const useForm = ({ role }: FormHook) => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const formHandler = hooks.useFormHandler(setForm)
    const login = (event: React.FormEvent) => {
        loginModalHelpers.login({
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

export default useForm
