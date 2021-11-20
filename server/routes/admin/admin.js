import { Router } from 'express'

import middlewares from '@middlewares'

import Services from './services'

const router = Router()

router.post(
    '/login',
    middlewares.rateLimiter('login'),
    Services.login.validation(),
    middlewares.checkValidation,
    Services.login.default
)

export default router
