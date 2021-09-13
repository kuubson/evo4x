import { Router } from 'express'

import middlewares from '@middlewares'

import Services from './services'

const router = Router()

router.post(
    '/register',
    middlewares.rateLimiter('registration'),
    Services.register.validation(),
    middlewares.checkValidation,
    Services.register.default
)

router.post(
    '/authenticateEmail',
    middlewares.rateLimiter('email address authentication'),
    Services.authenticateEmail.validation(),
    middlewares.checkValidation,
    Services.authenticateEmail.default
)

router.post(
    '/resendEmail',
    middlewares.rateLimiter('e-mail resend'),
    Services.resendEmail.validation(),
    middlewares.checkValidation,
    Services.resendEmail.default
)

router.post(
    '/login',
    middlewares.rateLimiter('login'),
    Services.login.validation(),
    middlewares.checkValidation,
    Services.login.default
)

router.post(
    '/requestPasswordChange',
    middlewares.rateLimiter('password change'),
    Services.requestPasswordChange.validation(),
    middlewares.checkValidation,
    Services.requestPasswordChange.default
)

router.post(
    '/changePassword',
    middlewares.rateLimiter('password change'),
    Services.changePassword.validation(),
    middlewares.checkValidation,
    Services.changePassword.default
)

router.get('/getProfile', middlewares.jwtAuthorization, Services.getProfile.default)

export default router
