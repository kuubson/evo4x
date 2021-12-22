import utils from 'utils'

import loginModalHelpers from '.'

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

const login = async ({ event, role, form, setForm, formHandler }: LoginHandler) => {
    event.preventDefault()
    if (
        loginModalHelpers.validate({
            form,
            setForm,
            formHandler
        })
    ) {
        try {
            const url = `/api/${role}/auth/login`
            const { email, password } = form
            const response = await utils.axios.post(url, {
                email,
                password
            })
            if (response) {
                utils.setRole(role)
                utils.history.push(role === 'admin' ? '/admin/analysis' : '/user/profile')
            }
        } catch (error) {
            utils.handleApiValidation(error, setForm)
        }
    }
}

export default login
