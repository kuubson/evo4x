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
    middlewares.rateLimiter('email authentication'),
    Services.authenticateEmail.validation(),
    middlewares.checkValidation,
    Services.authenticateEmail.default
)

router.post(
    '/resendEmail',
    middlewares.rateLimiter('resending email'),
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
    '/resetPassword',
    middlewares.rateLimiter('reseting password'),
    Services.resetPassword.validation(),
    middlewares.checkValidation,
    Services.resetPassword.default
)

router.post(
    '/checkPasswordToken',
    middlewares.rateLimiter('reseting password'),
    Services.checkPasswordToken.validation(),
    middlewares.checkValidation,
    Services.checkPasswordToken.default
)

router.post(
    '/changePassword',
    middlewares.rateLimiter('changing password'),
    Services.changePassword.validation(),
    middlewares.checkValidation,
    Services.changePassword.default
)

export default router
