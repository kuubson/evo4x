import { Form } from './getProfile'

type Validator = {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

const validateProfile = ({ form, setForm, formHandler }: Validator) => {
    let validated = true
    setForm(form => ({
        ...form,
        nameError: '',
        storyError: ''
    }))
    const { name } = form
    if (!formHandler.validateProperty('name', name)) validated = false
    return validated
}

export default validateProfile
