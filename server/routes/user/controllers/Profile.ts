import { Router } from 'express'

import middlewares from 'middlewares'

import profile from 'routes/user/services/profile'

const router = Router()

router.get('/getProfile', middlewares.jwtAuthorization, profile.getProfile.default as any)

router.post(
    '/updateProfile',
    middlewares.jwtAuthorization,
    profile.updateProfile.validation(),
    middlewares.checkValidation,
    profile.updateProfile.default as any
)

router.post(
    '/changeAvatar',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile() as any,
    profile.changeAvatar.default as any
)

router.get('/removeAvatar', middlewares.jwtAuthorization, profile.removeAvatar.default as any)

export default router
