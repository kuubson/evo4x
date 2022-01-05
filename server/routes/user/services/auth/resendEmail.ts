import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from 'database'

import { transporter, validator } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import { Route } from 'types/express'

export const resendEmail: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { email } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                include: [Authentication]
            })
            if (!user || !user.authentication) {
                throw new ApiError('The email address provided is incorrect', 404)
            }
            if (user.authentication.authenticated) {
                throw new ApiError('The email address provided is already authenticated', 409)
            }
            const emailToken = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: '2h' })
            await user.authentication.update(
                {
                    emailToken
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                to: email,
                subject: 'Email address authentication in the evo4x app',
                html: emailTemplate(
                    'Email address authentication in the evo4x app',
                    `To authenticate your email address click the button`,
                    'Authenticate email address',
                    `${baseUrl(req)}/?emailToken=${emailToken}`
                )
            }
            transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new ApiError(
                            'There was a problem resending an e-mail with a link to authenticate your email address',
                            502
                        )
                    }
                    res.send({
                        feedback:
                            'An e-mail with a link to authenticate your email address has been resent to you'
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

export const validation = () => [validator.validateEmail()]
