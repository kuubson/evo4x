import { Router } from 'express'

import middlewares from '@middlewares'

import Services from './services'

const router = Router()

router.get(
    '/checkRole',
    Services.checkRole.validation(),
    middlewares.checkValidation,
    Services.checkRole.default
)

router.get('/logout', Services.logout.default)

export default router
