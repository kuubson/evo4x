import { Form } from '../helpers/handleHelpSidebar'

type Validator = {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    issue: string
    formHandler: any
}

const validate = ({ issue, form, setForm, formHandler }: Validator) => {
    let validated = true
    setForm(form => ({
        ...form,
        emailError: '',
        passwordError: '',
        repeatedPasswordError: ''
    }))
    if (issue === 'changePassword') {
        const { password, repeatedPassword } = form
        if (!formHandler.validatePassword(password, '', false)) validated = false
        if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
    } else {
        const { email } = form
        if (!formHandler.validateEmail(email)) validated = false
    }
    return validated
}

export default validate
