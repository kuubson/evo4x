import { Router } from 'express'

import middlewares from 'middlewares'

import auth from 'routes/user/services/auth'

const router = Router()

router.post(
    '/register',
    middlewares.rateLimiter('registration'),
    auth.register.validation(),
    middlewares.checkValidation,
    auth.register.default
)

router.post(
    '/authenticateEmail',
    middlewares.rateLimiter('email address authentication'),
    auth.authenticateEmail.validation(),
    middlewares.checkValidation,
    auth.authenticateEmail.default
)

router.post(
    '/resendEmail',
    middlewares.rateLimiter('e-mail resend'),
    auth.resendEmail.validation(),
    middlewares.checkValidation,
    auth.resendEmail.default
)

router.post(
    '/login',
    middlewares.rateLimiter('login'),
    auth.login.validation(),
    middlewares.checkValidation,
    auth.login.default
)

router.post(
    '/requestPasswordChange',
    middlewares.rateLimiter('password change'),
    auth.requestPasswordChange.validation(),
    middlewares.checkValidation,
    auth.requestPasswordChange.default
)

router.post(
    '/changePassword',
    middlewares.rateLimiter('password change'),
    auth.changePassword.validation(),
    middlewares.checkValidation,
    auth.changePassword.default
)

export default router
