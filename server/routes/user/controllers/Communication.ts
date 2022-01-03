import { Router } from 'express'

import { jwtAuthorization, handleMulterFile, checkValidation } from 'middlewares'

import { communication } from '../services'

export const Communication = Router()

Communication.post(
    '/subscribePushNotifications',
    jwtAuthorization,
    communication.subscribePushNotifications.validation(),
    checkValidation,
    communication.subscribePushNotifications.subscribePushNotifications as any
)

Communication.post(
    '/getMessages',
    jwtAuthorization,
    communication.getMessages.validation(),
    checkValidation,
    communication.getMessages.getMessages as any
)

Communication.post(
    '/sendMessage',
    jwtAuthorization,
    communication.sendMessage.validation(),
    checkValidation,
    communication.sendMessage.sendMessage as any
)

Communication.post(
    '/sendFile',
    jwtAuthorization,
    handleMulterFile() as any,
    communication.sendFile.sendFile as any
)

Communication.get(
    '/getMessagesInfo',
    jwtAuthorization,
    communication.getMessagesInfo.getMessagesInfo as any
)

Communication.post(
    '/getAnalysis',
    jwtAuthorization,
    communication.getAnalysis.validation(),
    checkValidation,
    communication.getAnalysis.getAnalysis as any
)
