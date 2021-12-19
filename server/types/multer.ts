import { Request, Response, NextFunction } from 'express'

export type MulterRequest = Request & {
    file: Express.Multer.File
    allowedExtenstionsError: boolean
    sizeLimit: boolean
}

export type MulterRoute = (req: MulterRequest, res: Response, next: NextFunction) => void
