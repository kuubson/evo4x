import express, { Application } from 'express'
import { Server } from 'http'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'

import webpush from 'web-push'
webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY!,
    process.env.PRIVATE_VAPID_KEY!
)

import cloudinary from 'cloudinary'
const initializeCloudinary = () =>
    (cloudinary as any).config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
initializeCloudinary()

import { initializeCsrf } from './csrf'
import { initializeSocketIO } from 'socketio/socketio'

import { initializePassport } from './passport'
initializePassport(passport)

export { rateLimiter } from './rateLimiter'
export { jwtAuthorization } from './jwtAuthorization'
export { errorHandler } from './errorHandler'
export { checkValidation } from './checkValidation'
export { multerFile } from './multerFile'
export { handleMulterFile } from './handleMulterFile'

export const initializeMiddlewares = (app: Application, server: Server) => {
    app.use(helmet())
    initializeCsrf(app)
    initializeSocketIO(new SocketServer(server))
    app.use(express.json({ limit: '200kb' }))
    app.use(express.urlencoded({ extended: true, limit: '200kb' }))
    app.use(cookieParser())
    app.use(passport.initialize())
    app.set('trust proxy', true)
}
