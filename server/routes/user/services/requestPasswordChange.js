import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from '@database'

import utils from '@utils'

const requestPasswordChange = async (req, res, next) => {
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
                throw new utils.ApiError('The email address provided is incorrect', 404)
            }
            if (!user.authentication.authenticated) {
                throw new utils.ApiError(
                    'The email address provided must first be authenticated',
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
                subject: 'Password changing in the evo4x app',
                html: utils.emailTemplate(
                    'Password changing in the evo4x app',
                    `To change your password click the button`,
                    'Change password',
                    `${utils.baseUrl(req)}/?token=${passwordToken}`
                )
            }
            utils.transporter.sendMail(mailOptions, (error, info) => {
                try {
                    if (error || !info) {
                        throw new utils.ApiError(
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

export const validation = () => [utils.validator.validateEmail()]

export default requestPasswordChange
