import { Form } from './handleHelpSidebar'

type Validator = {
    form: Form
    setForm: ReactDispatch<Form>
    issue: Issue
    formHandler: any
}

export const validate = ({ issue, form, setForm, formHandler }: Validator) => {
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
