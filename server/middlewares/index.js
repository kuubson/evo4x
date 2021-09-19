import express from 'express'
import io from 'socket.io'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import passport from 'passport'

import webpush from 'web-push'
webpush.setVapidDetails(
    `mailto:${process.env.NODEMAILER_USERNAME}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

import cloudinary from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

import initSocketIo from '../socketio/socketio'

import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import rateLimiter from './rateLimiter'
import jwtAuthorization from './jwtAuthorization'
import multerFile from './multerFile'
import handleMulterFile from './handleMulterFile'

import utils from '@utils'

const init = (app, server) => {
    initSocketIo(io(server))
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    )
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(passport.initialize())
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
    app.use((req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken(), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            maxAge: utils.cookie.maxAge
        })
        next()
    })
    app.set('trust proxy', true)
}

export default {
    init,
    errorHandler,
    checkValidation,
    rateLimiter,
    jwtAuthorization,
    multerFile,
    handleMulterFile
}
