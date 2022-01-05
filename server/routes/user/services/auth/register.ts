import jwt from 'jsonwebtoken'

import { Connection, User, Authentication, Profile } from 'database'

import { transporter, validator, getDefaultAvatar } from 'helpers'

import { ApiError, baseUrl, emailTemplate } from 'utils'

import { Route } from 'types/express'

export const register: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { name, email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) {
                throw new ApiError('The email address provided is already taken', 409)
            }
            const emailToken = jwt.sign({ email }, process.env.JWT_KEY!, { expiresIn: '2h' })
            await User.create(
                {
                    email,
                    password,
                    authentication: {
                        emailToken
                    },
                    profile: {
                        name,
                        avatar: getDefaultAvatar(name)
                    }
                },
                {
                    include: [Authentication, Profile],
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
                            'There was a problem sending an e-mail with a link to authenticate your email address',
                            502
                        )
                    }
                    res.send({
                        feedback:
                            'An e-mail with a link to authenticate your email address has been sent to you'
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

export const validation = () => [
    validator.validateProperty('name'),
    validator.validateEmail(),
    validator.validatePassword(),
    validator.validateRepeatedPassword()
]
