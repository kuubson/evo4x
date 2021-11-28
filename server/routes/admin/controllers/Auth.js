import { Router } from 'express'

import middlewares from '@middlewares'

import auth from '../services/auth'

const router = Router()

router.post(
    '/login',
    middlewares.rateLimiter('login'),
    auth.login.validation(),
    middlewares.checkValidation,
    auth.login.default
)

export default router
