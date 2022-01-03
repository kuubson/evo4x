import { Router } from 'express'

import { Auth } from './controllers'

export const Admin = Router()

Admin.use('/auth', Auth)
