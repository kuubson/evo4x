import { Router } from 'express'

import { Auth, Profile, Communication } from './controllers'

export const User = Router()

User.use('/auth', Auth)
User.use('/profile', Profile)
User.use('/communication', Communication)
