import { Form } from './register'

type Validator = {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

const validate = ({ form, setForm, formHandler }: Validator) => {
    let validated = true
    setForm(form => ({
        ...form,
        nameError: '',
        emailError: '',
        passwordError: '',
        repeatedPasswordError: ''
    }))
    const { name, email, password, repeatedPassword } = form
    if (!formHandler.validateProperty('name', name)) validated = false
    if (!formHandler.validateEmail(email)) validated = false
    if (!formHandler.validatePassword(password, repeatedPassword, false)) validated = false
    if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
    return validated
}

export default validate
