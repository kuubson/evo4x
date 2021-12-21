import { User, Profile, Message } from 'database/database'

import utils from 'utils'
import userUtils from 'routes/user/utils'

import { ProtectedRoute } from 'types/express'

const getMessages: ProtectedRoute = async (req, res, next) => {
    try {
        const {
            id,
            profile: { name, avatar }
        } = req.user
        const { limit, offset } = req.body
        const messages = await Message.findAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['userId']
            },
            include: [
                {
                    model: User,
                    attributes: ['id'],
                    include: [
                        {
                            model: Profile,
                            attributes: ['name', 'avatar']
                        }
                    ]
                }
            ]
        }).then(messages => messages.sort((a, b) => a.id - b.id))
        await userUtils.updateReadByProperty(id, messages)
        res.send({
            user: {
                id,
                profile: {
                    name,
                    avatar
                }
            },
            messages
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    utils.validator.validateInteger('limit'),
    utils.validator.validateInteger('offset')
]

export default getMessages
