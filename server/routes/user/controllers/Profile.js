import { Router } from 'express'

import middlewares from '@middlewares'

import profile from '../services/profile'

const router = Router()

router.get('/getProfile', middlewares.jwtAuthorization, profile.getProfile.default)

router.post(
    '/updateProfile',
    middlewares.jwtAuthorization,
    profile.updateProfile.validation(),
    middlewares.checkValidation,
    profile.updateProfile.default
)

router.post(
    '/changeAvatar',
    middlewares.jwtAuthorization,
    middlewares.handleMulterFile(),
    profile.changeAvatar.default
)

router.get('/removeAvatar', middlewares.jwtAuthorization, profile.removeAvatar.default)

export default router
