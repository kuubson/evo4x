import { Form } from './getProfile'

type ProfileValidator = {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    formHandler: any
}

const validateProfile = ({ form, setForm, formHandler }: ProfileValidator) => {
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
