import { useState } from 'react'

import hooks from 'hooks'

import registrationModalHelpers from '../helpers'

const useForm = () => {
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
    const formHandler = hooks.useFormHandler(setForm)
    const register = (event: React.FormEvent) => {
        registrationModalHelpers.register({
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

export default useForm
