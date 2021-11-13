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

router.post(
    '/subscribePushNotifications',
    middlewares.jwtAuthorization,
    Services.subscribePushNotifications.validation(),
    middlewares.checkValidation,
    Services.subscribePushNotifications.default
)

router.post(
    '/getMessages',
    middlewares.jwtAuthorization,
    Services.getMessages.validation(),
    middlewares.checkValidation,
    Services.getMessages.default
)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    Services.sendMessage.validation(),
    middlewares.checkValidation,
    Services.sendMessage.default
)

router.post(
    '/sendFile',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile(),
    Services.sendFile.default
)

router.get(
    '/getUnreadMessagesInfo',
    middlewares.jwtAuthorization,
    Services.getUnreadMessagesInfo.default
)

router.post(
    '/getAnalysis',
    middlewares.jwtAuthorization,
    Services.getAnalysis.validation(),
    middlewares.checkValidation,
    Services.getAnalysis.default
)

export default router
