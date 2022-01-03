import express, { Application } from 'express'
import { Server } from 'http'
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
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

import { initializeSocketIO } from 'socketio/socketio'
import { initializePassport } from './passport'
import { initializeCsrf } from './csrf'

initializePassport(passport)

export const initializeMiddlewares = (app: Application, server: Server) => {
    initializeSocketIO(new SocketServer(server))
    app.use(express.json({ limit: '200kb' }))
    app.use(express.urlencoded({ extended: true, limit: '200kb' }))
    app.use(cookieParser())
    app.use(passport.initialize())
    initializeCsrf(app)
}

export { errorHandler } from './errorHandler'
export { rateLimiter } from './rateLimiter'
export { jwtAuthorization } from './jwtAuthorization'
export { handleMulterFile } from './handleMulterFile'
export { multerFile } from './multerFile'
export { checkValidation } from './checkValidation'
