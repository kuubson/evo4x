import { Request, Response, NextFunction } from 'express'

import { User } from 'database/models/User'

import { MulterRequest } from 'types/multer'

export type Route = (req: Request, res: Response, next: NextFunction) => void

export type UserRequest = Request & {
    user: User
}

export type ProtectedRoute = (req: UserRequest, res: Response, next: NextFunction) => Promise<void>

export type ProtectedMulterRoute = (
    req: UserRequest & MulterRequest,
    res: Response,
    next: NextFunction
) => Promise<void>
