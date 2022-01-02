import { handleApiValidation } from 'helpers'

import { axios } from 'utils'

import { validate } from '.'

export type Form = {
    name: string
    nameError: string
    email: string
    emailError: string
    password: string
    passwordError: string
    repeatedPassword: string
    repeatedPasswordError: string
}

type RegistrationHandler = {
    event: React.FormEvent
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

export const register = async ({ event, form, setForm, formHandler }: RegistrationHandler) => {
    event.preventDefault()
    if (
        validate({
            form,
            setForm,
            formHandler
        })
    ) {
        try {
            const url = '/api/user/auth/register'
            const { name, email, password, repeatedPassword } = form
            await axios.post(url, {
                name,
                email,
                password,
                repeatedPassword
            })
        } catch (error) {
            handleApiValidation(error, setForm)
        }
    }
}
