import { setRole, handleApiValidation } from 'helpers'

import { history, axios } from 'utils'

import { validate } from '.'

export type Form = {
    email: string
    emailError: string
    password: string
    passwordError: string
}

type LoginHandler = {
    event: React.FormEvent
    role: Role
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

export const login = async ({ event, role, form, setForm, formHandler }: LoginHandler) => {
    event.preventDefault()
    if (
        validate({
            form,
            setForm,
            formHandler
        })
    ) {
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

export default login
