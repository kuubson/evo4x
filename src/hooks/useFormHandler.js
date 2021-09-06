import validator from 'validator'
import sanitize from 'sanitize-html'

export default setForm => {
    const handleInputValue = ({ target: { name, value } }) =>
        setForm(form => ({ ...form, [name]: value }))
    const handleInputError = (errorKey, error) =>
        setForm(form => ({ ...form, [`${errorKey}Error`]: error }))
    const validateProperty = (property, value) => {
        let validated = true
        switch (true) {
            case !value.trim():
                validated = false
                handleInputError(property, 'This fields cannot be empty')
                break
            case value !== sanitize(value):
                validated = false
                handleInputError(property, 'This field contains invalid characters')
                break
            default:
                handleInputError(property, '')
        }
        return validated
    }
    const validateEmail = email => {
        let validated = true
        switch (true) {
            case !email.trim():
                validated = false
                handleInputError('email', 'Type your email address')
                break
            case !validator.isEmail(email):
                validated = false
                handleInputError('email', 'Type proper email address')
                break
            default:
                handleInputError('email', '')
        }
        return validated
    }
    const validatePassword = (password, repeatedPassword, withLogin = false) => {
        let validated = true
        if (!withLogin) {
            switch (true) {
                case !password:
                    validated = false
                    handleInputError('password', 'Type your password')
                    break
                case !/(?=.{8,})/.test(password):
                    validated = false
                    handleInputError('password', 'Password must be at least 8 characters long')
                    break
                case !/(?=.*[a-z])/.test(password):
                    validated = false
                    handleInputError('password', 'Password must contain at least one small letter')
                    break
                case !/(?=.*[A-Z])/.test(password):
                    validated = false
                    handleInputError('password', 'Password must contain at least one big letter')
                    break
                case !/(?=.*[0-9])/.test(password):
                    validated = false
                    handleInputError('password', 'Password must contain at least one digit')
                    break
                default:
                    handleInputError('password', '')
            }
            switch (true) {
                case repeatedPassword && password !== repeatedPassword:
                    validated = false
                    handleInputError('repeatedPassword', 'Passwords are different')
                    break
                default:
                    handleInputError('repeatedPassword', '')
            }
        } else {
            switch (true) {
                case !password:
                    validated = false
                    handleInputError('password', 'Type your password')
                    break
                default:
                    handleInputError('password', '')
            }
        }
        return validated
    }
    const validateRepeatedPassword = (repeatedPassword, password) => {
        let validated = true
        switch (true) {
            case !repeatedPassword:
                validated = false
                handleInputError('repeatedPassword', 'You have to type password twice')
                break
            case repeatedPassword !== password:
                validated = false
                handleInputError('repeatedPassword', 'Passwords are different')
                break
            default:
                handleInputError('repeatedPassword', '')
        }
        return validated
    }
    return {
        handleInputValue,
        handleInputError,
        validateProperty,
        validateEmail,
        validatePassword,
        validateRepeatedPassword
    }
}
