import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import csurf from 'csurf'
import passport from 'passport'

import initPassport from './passport'
initPassport(passport)

import errorHandler from './errorHandler'
import checkValidation from './checkValidation'
import rateLimiter from './rateLimiter'
import jwtAuthorization from './jwtAuthorization'

import utils from '@utils'

const init = app => {
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    )
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
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
    jwtAuthorization
}
