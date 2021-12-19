import express, { Application } from 'express'
import { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import webpush from 'web-push'
webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY!,
    process.env.PRIVATE_VAPID_KEY!
)

import cloudinary from 'cloudinary'

const initCloudinary = () => {
    ;(cloudinary as any).config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}
initCloudinary()

import initSocketIo from '../socketio/socketio'
import initCSRF from './csrf'
import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import rateLimiter from './rateLimiter'
import jwtAuthorization from './jwtAuthorization'
import multerFile from './multerFile'
import handleMulterFile from './handleMulterFile'

const init = (app: Application, server: Server) => {
    initSocketIo(new SocketServer(server))
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    )
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(passport.initialize())
    initCSRF(app)
    app.set('trust proxy', true)
}

const middlewares = {
    init,
    errorHandler,
    checkValidation,
    rateLimiter,
    jwtAuthorization,
    multerFile,
    handleMulterFile
}

export default middlewares
