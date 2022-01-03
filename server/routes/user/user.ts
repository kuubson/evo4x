import { Router } from 'express'

import Controllers from './controllers'

const router = Router()

router.use('/auth', Controllers.Auth)
router.use('/profile', Controllers.Profile)
router.use('/communication', Controllers.Communication)

export default router
