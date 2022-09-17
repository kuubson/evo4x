import { Router } from 'express'

import { checkValidation, rateLimiter } from 'middlewares'

import { auth } from '../services/'

export const Auth = Router()

Auth.post(
   '/login',
   rateLimiter('login'),
   auth.login.validation(),
   checkValidation,
   auth.login.login
)
