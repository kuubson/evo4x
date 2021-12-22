import { Form } from '../helpers/login'

type Validator = {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

const validate = ({ form, setForm, formHandler }: Validator) => {
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

export default validate
