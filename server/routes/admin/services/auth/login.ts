import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Admin } from 'database/database'

import { validator } from 'helpers'

import { ApiError, cookie } from 'utils'

import { Route } from 'types/express'

export const login: Route = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({
            where: {
                email
            }
        })
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            throw new ApiError('The email address or password provided is incorrect', 404)
        }
        const token = jwt.sign({ role: 'admin', email }, process.env.JWT_KEY!)
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: true,
            maxAge: cookie.maxAge
        }).send()
    } catch (error) {
        next(error)
    }
}

export const validation = () => [validator.validateEmail(), validator.validatePassword(true)]
