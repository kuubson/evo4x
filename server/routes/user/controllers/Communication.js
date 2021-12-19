import { Router } from 'express'

import middlewares from 'middlewares'

import communication from '../services/communication'

const router = Router()

router.post(
    '/subscribePushNotifications',
    middlewares.jwtAuthorization,
    communication.subscribePushNotifications.validation(),
    middlewares.checkValidation,
    communication.subscribePushNotifications.default
)

router.post(
    '/getMessages',
    middlewares.jwtAuthorization,
    communication.getMessages.validation(),
    middlewares.checkValidation,
    communication.getMessages.default
)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    communication.sendMessage.validation(),
    middlewares.checkValidation,
    communication.sendMessage.default
)

router.post(
    '/sendFile',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile(),
    communication.sendFile.default
)

router.get(
    '/getUnreadMessagesInfo',
    middlewares.jwtAuthorization,
    communication.getUnreadMessagesInfo.default
)

router.post(
    '/getAnalysis',
    middlewares.jwtAuthorization,
    communication.getAnalysis.validation(),
    middlewares.checkValidation,
    communication.getAnalysis.default
)

export default router
