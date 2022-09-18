import csurf from 'csurf'
import type { Application, NextFunction, Request, Response } from 'express'

import { cookie } from 'utils'

export const initializeCsrf = async (app: Application) => {
   app.use(
      csurf({
         cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: true,
            maxAge: cookie.maxAge,
         },
      })
   )
   app.use((req: Request, res: Response, next: NextFunction) => {
      res.cookie('XSRF-TOKEN', req.csrfToken(), {
         secure: process.env.NODE_ENV === 'production',
         sameSite: true,
         maxAge: cookie.maxAge,
      })
      next()
   })
}
