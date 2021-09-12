import jwt from 'jsonwebtoken'

import { Connection, User } from '@database'

import utils from '@utils'

const checkPasswordToken = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { passwordToken } = req.body
            return jwt.verify(passwordToken, process.env.JWT_KEY, async (error, data) => {
                try {
                    if (error) {
                        if (error.message.includes('expired')) {
                            throw new utils.ApiError('The password reset link has expired', 400)
                        }
                        throw new utils.ApiError('The password reset link is invalid', 400)
                    }
                    const user = await User.findOne({
                        where: {
                            email: data.email,
                            passwordToken
                        },
                        transaction
                    })
                    if (!user) {
                        throw new utils.ApiError('The password reset link is invalid', 404)
                    }
                    res.send()
                } catch (error) {
                    next(error)
                }
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [utils.validator.validateProperty('passwordToken').isJWT()]

export default checkPasswordToken
