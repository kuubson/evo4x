import { Application, Request, Response } from 'express'

import utils from 'utils'

const errorHandler = (app: Application) =>
    app.use((error: any, _: Request, res: Response) => utils.handleError(res, error))

export default errorHandler
