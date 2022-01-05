import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from 'database'

import { transporter, validator } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import { Route } from 'types/express'

export const requestPasswordChange: Route = async (req, res, next) => {
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
            if (!user.authentication.authenticated) {
                throw new ApiError('The email address provided must first be authenticated', 409)
            }
            const passwordToken = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: '1h' })
            await user.update(
                {
                    passwordToken
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                to: email,
                subject: 'Password changing in the evo4x app',
                html: emailTemplate(
                    'Password changing in the evo4x app',
                    `To change your password click the button`,
                    'Change password',
                    `${baseUrl(req)}/?passwordToken=${passwordToken}`
                )
            }
            transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new ApiError(
                            'There was a problem sending an e-mail with a link to change your password',
                            502
                        )
                    }
                    res.send({
                        feedback:
                            'An e-mail with a link to change your password has been sent to you'
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
