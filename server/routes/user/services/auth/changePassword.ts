import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Connection, User } from 'database/database'

import utils from 'utils'

import helpers from 'helpers'

import { Route } from 'types/express'

const changePassword: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { password, passwordToken } = req.body
            return jwt.verify(
                passwordToken,
                process.env.JWT_KEY!,
                async (error: any, data: any) => {
                    try {
                        if (error) {
                            if (error.message.includes('expired')) {
                                throw new utils.ApiError(
                                    'The link to change your password has expired',
                                    400
                                )
                            }
                            throw new utils.ApiError(
                                'The link to change your password is invalid',
                                400
                            )
                        }
                        const user = await User.findOne({
                            where: {
                                email: data.email,
                                passwordToken
                            }
                        })
                        if (!user) {
                            throw new utils.ApiError(
                                'The link to change your password is incorrect',
                                404
                            )
                        }
                        await user.update(
                            {
                                password: bcrypt.hashSync(password, 11),
                                passwordToken: null
                            },
                            {
                                transaction
                            }
                        )
                        res.send({
                            feedback: 'Your password has been changed. You can login now'
                        })
                    } catch (error) {
                        next(error)
                    }
                }
            )
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    helpers.validator.validatePassword(),
    helpers.validator.validateRepeatedPassword(),
    helpers.validator.validateProperty('passwordToken').isJWT()
]

export default changePassword
