import * as register from './register'
import * as authenticateEmail from './authenticateEmail'
import * as resendEmail from './resendEmail'
import * as login from './login'
import * as requestPasswordChange from './requestPasswordChange'
import * as changePassword from './changePassword'

const auth = {
    register,
    authenticateEmail,
    resendEmail,
    login,
    requestPasswordChange,
    changePassword
}

export default auth
