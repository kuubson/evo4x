import jwt from 'jsonwebtoken'

import { Admin, User } from 'database/database'

import utils from 'utils'

import helpers from 'helpers'

import { Route } from 'types/express'

const checkRole: Route = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res
            .clearCookie('token', {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                sameSite: true
            })
            .send({
                role: 'guest'
            })
    }
    return jwt.verify(token, process.env.JWT_KEY!, async (error: any, data: any) => {
        try {
            if (error) {
                if (error.message.includes('expired')) {
                    throw new utils.ApiError(
                        'The authentication cookie has expired. Please login again',
                        401
                    )
                }
                throw new utils.ApiError('Authentication has failed. Please login again', 401)
            }
            const { role, email } = data
            if (role === 'admin') {
                const admin = await Admin.findOne({
                    where: {
                        email
                    }
                })
                if (!admin) {
                    throw new utils.ApiError('Authentication has failed. Please login again', 401)
                }
                res.send({
                    role: 'admin'
                })
            } else if (role === 'user') {
                const user = await User.findOne({
                    where: {
                        email
                    }
                })
                if (!user) {
                    throw new utils.ApiError('Authentication has failed. Please login again', 401)
                }
                res.send({
                    role: 'user'
                })
            } else {
                throw new utils.ApiError('Authentication has failed. Please login again', 401)
            }
        } catch (error) {
            next(error)
        }
    })
}

export const validation = () => [helpers.validator.validateProperty('token').optional()]

export default checkRole
