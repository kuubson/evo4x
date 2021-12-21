import { Router } from 'express'

import middlewares from 'middlewares'

import communication from 'routes/user/services/communication'

const router = Router()

router.post(
    '/subscribePushNotifications',
    middlewares.jwtAuthorization,
    communication.subscribePushNotifications.validation(),
    middlewares.checkValidation,
    communication.subscribePushNotifications.default as any
)

router.post(
    '/getMessages',
    middlewares.jwtAuthorization,
    communication.getMessages.validation(),
    middlewares.checkValidation,
    communication.getMessages.default as any
)

router.post(
    '/sendMessage',
    middlewares.jwtAuthorization,
    communication.sendMessage.validation(),
    middlewares.checkValidation,
    communication.sendMessage.default as any
)

router.post(
    '/sendFile',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile() as any,
    communication.sendFile.default as any
)

router.get(
    '/getUnreadMessagesInfo',
    middlewares.jwtAuthorization,
    communication.getUnreadMessagesInfo.default as any
)

router.post(
    '/getAnalysis',
    middlewares.jwtAuthorization,
    communication.getAnalysis.validation(),
    middlewares.checkValidation,
    communication.getAnalysis.default as any
)

export default router
