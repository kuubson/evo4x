import jwt from 'jsonwebtoken'

import { Connection, Authentication } from 'database/database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import { Route } from 'types/express'

export const authenticateEmail: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { emailToken } = req.body
            return jwt.verify(emailToken, process.env.JWT_KEY!, async (error: any) => {
                try {
                    const authentication = await Authentication.findOne({
                        where: {
                            emailToken
                        }
                    })
                    if (error || !authentication) {
                        if (authentication && error.message.includes('expired')) {
                            throw new ApiError(
                                'The link to authenticate your email address has expired',
                                400
                            )
                        }
                        throw new ApiError(
                            'The link to authenticate your email address is invalid',
                            400
                        )
                    }
                    if (authentication.authenticated) {
                        throw new ApiError(
                            'The email address provided is already authenticated',
                            400
                        )
                    }
                    await authentication.update(
                        {
                            authenticated: true
                        },
                        {
                            transaction
                        }
                    )
                    res.send({
                        feedback: 'Your email address has been authenticated. You can login now'
                    })
                } catch (error) {
                    next(error)
                }
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateProperty('emailToken').isJWT()]
