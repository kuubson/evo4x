import { Application, Response, Request, NextFunction } from 'express'
import csurf from 'csurf'

import utils from '../utils'

const csrf = async (app: Application) => {
    app.use(
        csurf({
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true,
                maxAge: utils.cookie.maxAge
            }
        })
    )
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            maxAge: utils.cookie.maxAge
        })
        next()
    })
}

export default csrf
