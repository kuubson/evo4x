import global from './global/global'

import admin from './admin/admin'

import user from './user/user'

export default app => {
    app.use('/api/global', global)
    app.use('/api/admin', admin)
    app.use('/api/user', user)
}
