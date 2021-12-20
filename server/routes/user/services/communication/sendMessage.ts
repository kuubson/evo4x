import { check } from 'express-validator'
import webpush from 'web-push'

import { Connection, User, Subscription } from 'database/database'

import utils from 'utils'

import { ProtectedRoute } from 'types/express'

const sendMessage: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id, name } = req.user
            const { content } = req.body
            await req.user.createMessage(
                {
                    type: 'MESSAGE',
                    content,
                    readBy: id
                },
                {
                    transaction
                }
            )
            await User.findAll({
                where: {
                    id: {
                        [utils.Op.ne]: id
                    }
                },
                include: [Subscription]
            }).then(users =>
                users.map(user => {
                    user.subscriptions.map(subscription => {
                        webpush
                            .sendNotification(
                                {
                                    endpoint: subscription.endpoint,
                                    keys: {
                                        p256dh: subscription.p256dh,
                                        auth: subscription.auth
                                    }
                                },
                                JSON.stringify({
                                    tag: id,
                                    title: `From ${name}`,
                                    body: `${content}`,
                                    icon: `${utils.baseUrl(req)}/Logo.png`,
                                    data: {
                                        userName: name,
                                        url: `${utils.baseUrl(req)}/user/chat`
                                    }
                                })
                            )
                            .catch(async ({ statusCode }) => {
                                if (statusCode === 410) {
                                    await subscription.destroy()
                                }
                            })
                    })
                })
            )
            res.send()
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [check('content').trim().isString().bail()]

export default sendMessage
