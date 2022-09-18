import { Router } from 'express'

import { checkValidation } from 'middlewares'

import { auth } from '../services'

export const Auth = Router()

Auth.get('/checkRole', auth.checkRole.validation(), checkValidation, auth.checkRole.checkRole)

Auth.get('/logout', auth.logout.logout)
