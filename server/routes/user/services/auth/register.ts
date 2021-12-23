import jwt from 'jsonwebtoken'

import { Connection, User, Authentication, Profile } from 'database/database'

import utils from 'utils'

import { Route } from 'types/express'

const register: Route = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { name, email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) {
                throw new utils.ApiError('The email address provided is already taken', 409)
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
                        avatar: utils.defaultAvatar(name)
                    }
                },
                {
                    include: [Authentication, Profile],
                    transaction
                }
            )
            const mailOptions = {
                from: `"evo4x app" <${process.env.NODEMAILER_USERNAME}>`,
                to: email,
                subject: 'Email address authentication in the evo4x app',
                html: utils.emailTemplate(
                    'Email address authentication in the evo4x app',
                    `To authenticate your email address click the button`,
                    'Authenticate email address',
                    `${utils.baseUrl(req)}/?emailToken=${emailToken}`
                )
            }
            utils.transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new utils.ApiError(
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
    utils.validator.validateProperty('name'),
    utils.validator.validateEmail(),
    utils.validator.validatePassword(),
    utils.validator.validateRepeatedPassword()
]

export default register