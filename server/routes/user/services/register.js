import jwt from 'jsonwebtoken'

import { Connection, User, Authentication } from '@database'

import utils from '@utils'

const register = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { name, email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                },
                transaction
            })
            if (user) {
                throw new utils.ApiError('User with email address provided already exists', 409)
            }
            const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '24h' })
            await User.create(
                {
                    name,
                    email,
                    password,
                    authentication: {
                        token
                    }
                },
                {
                    include: [Authentication],
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
                            'An e-mail with an activation link has been sent to the email address provided. Open it and activate your account'
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
