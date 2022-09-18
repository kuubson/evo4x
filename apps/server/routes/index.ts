import type { Application } from 'express'

import { Admin } from './admin/admin'
import { Global } from './global/global'
import { User } from './user/user'

export const routes = (app: Application) => {
   app.use('/api/global', Global)
   app.use('/api/admin', Admin)
   app.use('/api/user', User)
}
