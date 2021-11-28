import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User, Authentication } from '@database'

import utils from '@utils'

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
            },
            include: [Authentication]
        })
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new utils.ApiError('The email address or password provided is incorrect', 404)
        }
        if (!user.authentication.authenticated) {
            throw new utils.ApiError('The email address provided must first be authenticated', 409)
        }
        const token = jwt.sign({ role: 'user', email }, process.env.JWT_KEY)
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
