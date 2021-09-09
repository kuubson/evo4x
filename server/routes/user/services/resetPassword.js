import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from '@database'

import utils from '@utils'

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { email } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                include: [Authentication],
                transaction
            })
            if (!user || !user.authentication) {
                throw new utils.ApiError('The email address provided is invalid', 404)
            }
            if (!user.authentication.authenticated) {
                throw new utils.ApiError(
                    'An account assigned to email address provided must be firstly authenticated',
                    409
                )
            }
            const passwordToken = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' })
            await user.update(
                {
                    passwordToken
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                from: `"evo4x app" <${process.env.NODEMAILER_USERNAME}>`,
                to: email,
                subject: 'Password reset in the evo4x app',
                html: utils.emailTemplate(
                    'Password reset in the evo4x app',
                    `To change your password click the button`,
                    'Change password',
                    `${utils.baseUrl(req)}/?token=${passwordToken}`
                )
            }
            utils.transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new utils.ApiError(
                            'There was a problem when sending an e-mail with a password reset link for your account',
                            502
                        )
                    }
                    res.send({
                        feedback:
                            'An e-mail with an password reset link for your account has been sent'
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

export const validation = () => [utils.validator.validateEmail()]
