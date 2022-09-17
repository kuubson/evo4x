import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import type { Application } from 'express'
import express from 'express'
import type { Server } from 'http'
import passport from 'passport'
import { Server as SocketServer } from 'socket.io'
import { initializeSocketIO } from 'socketio/socketio'
import webpush from 'web-push'

import { initializeCsrf } from './csrf'
import { initializePassport } from './passport'

webpush.setVapidDetails(
   `mailto:${process.env.NODEMAILER_USERNAME}`,
   process.env.REACT_APP_PUBLIC_VAPID_KEY!,
   process.env.PRIVATE_VAPID_KEY!
)

cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
})

initializePassport(passport)

export const initializeMiddlewares = (app: Application, server: Server) => {
   app.use(express.json({ limit: '200kb' }))
   app.use(
      express.urlencoded({
         extended: true,
         limit: '200kb',
      })
   )
   app.use(cookieParser())
   app.use(passport.initialize())
   initializeCsrf(app)
   initializeSocketIO(new SocketServer(server))
}

export { errorHandler } from './errorHandler'
export { rateLimiter } from './rateLimiter'
export { jwtAuthorization } from './jwtAuthorization'
export { handleMulterFile } from './handleMulterFile'
export { multerFile } from './multerFile'
export { checkValidation } from './checkValidation'
