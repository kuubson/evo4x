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
            if (user.authentication.authenticated) {
                throw new utils.ApiError(
                    'An account assigned to email address provided is already authenticated',
                    409
                )
            }
            const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '24h' })
            await user.authentication.update(
                {
                    token
                },
                {
                    transaction
                }
            )
            const mailOptions = {
                from: `"evo4x app" <${process.env.NODEMAILER_USERNAME}>`,
                to: email,
                subject: 'Account activation in the evo4x app',
                html: utils.emailTemplate(
                    'Account activation in the evo4x app',
                    `To activate your account click the button`,
                    'Activate account',
                    `${utils.baseUrl(req)}/${token}`
                )
            }
            utils.transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new utils.ApiError(
                            'There was a problem when sending an e-mail with an activation link for your account',
                            502
                        )
                    }
                    res.send({
                        feedback:
                            'An e-mail with an activation link for your account has been resent'
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
