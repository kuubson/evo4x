import { Application } from 'express'

import { Global } from './global/global'
import { Admin } from './admin/admin'
import { User } from './user/user'

export const routes = (app: Application) => {
    app.use('/api/global', Global)
    app.use('/api/admin', Admin)
    app.use('/api/user', User)
}
