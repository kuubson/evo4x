import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Admin } from '@database'

import utils from '@utils'

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({
            where: {
                email
            }
        })
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            throw new utils.ApiError('The email address or password provided is incorrect', 404)
        }
        const token = jwt.sign({ role: 'admin', email }, process.env.JWT_KEY)
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: true,
            maxAge: utils.cookie.maxAge
        }).send()
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    utils.validator.validateEmail(),
    utils.validator.validatePassword(true)
]

export default login
