import { check } from 'express-validator'

import { Connection } from 'database/database'

import utils from 'utils'
import userUtils from 'routes/user/utils'

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
            userUtils.sendNotificationsForOtherUsers(id, {
                tag: id,
                title: `From ${name}`,
                body: content,
                icon: `${utils.baseUrl(req)}/Logo.png`,
                data: {
                    userName: name,
                    url: `${utils.baseUrl(req)}/user/chat`
                }
            })
            res.send()
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [check('content').trim().isString().bail()]

export default sendMessage
