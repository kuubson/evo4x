/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, Request, Response, NextFunction } from 'express'

import { handleError } from 'utils'

export const errorHandler = (app: Application) =>
    app.use((error: any, _: Request, res: Response, __: NextFunction) => handleError(res, error))
