import { check } from 'express-validator'

import { Connection } from 'database'

import { sendNotificationsForOtherUsers } from 'routes/user/helpers'

import { baseUrl } from 'utils'

import { ProtectedRoute } from 'types/express'

export const sendMessage: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id } = req.user
            const { name } = req.user.profile
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
            sendNotificationsForOtherUsers(id, {
                tag: id,
                title: `From ${name}`,
                body: content,
                icon: `${baseUrl(req)}/Logo.png`,
                data: {
                    userName: name,
                    url: `${baseUrl(req)}/user/chat`
                }
            })
            res.send()
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [check('content').trim().isString().bail()]
