import utils from 'utils'

import registerModalHelpers from '.'

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

type RegisterHandler = {
    event: React.FormEvent
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

const register = async ({ event, form, setForm, formHandler }: RegisterHandler) => {
    event.preventDefault()
    if (
        registerModalHelpers.validate({
            form,
            setForm,
            formHandler
        })
    ) {
        try {
            const url = '/api/user/auth/register'
            const { name, email, password, repeatedPassword } = form
            await utils.axios.post(url, {
                name,
                email,
                password,
                repeatedPassword
            })
        } catch (error) {
            utils.handleApiValidation(error, setForm)
        }
    }
}

export default register
