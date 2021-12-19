import { Router } from 'express'

import middlewares from 'middlewares'

import auth from '../services/auth'

const router = Router()

router.get(
    '/checkRole',
    auth.checkRole.validation(),
    middlewares.checkValidation,
    auth.checkRole.default
)

router.get('/logout', auth.logout.default)

export default router
