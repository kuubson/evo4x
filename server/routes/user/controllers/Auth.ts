import { Router } from 'express'

import { checkValidation, rateLimiter } from 'middlewares'

import { auth } from '../services'

export const Auth = Router()

Auth.post(
   '/register',
   rateLimiter('registration'),
   auth.register.validation(),
   checkValidation,
   auth.register.register
)

Auth.post(
   '/authenticateEmail',
   rateLimiter('email address authentication'),
   auth.authenticateEmail.validation(),
   checkValidation,
   auth.authenticateEmail.authenticateEmail
)

Auth.post(
   '/resendEmail',
   rateLimiter('e-mail resend'),
   auth.resendEmail.validation(),
   checkValidation,
   auth.resendEmail.resendEmail
)

Auth.post(
   '/login',
   rateLimiter('login'),
   auth.login.validation(),
   checkValidation,
   auth.login.login
)

Auth.post(
   '/requestPasswordChange',
   rateLimiter('password change'),
   auth.requestPasswordChange.validation(),
   checkValidation,
   auth.requestPasswordChange.requestPasswordChange
)

Auth.post(
   '/changePassword',
   rateLimiter('password change'),
   auth.changePassword.validation(),
   checkValidation,
   auth.changePassword.changePassword
)
