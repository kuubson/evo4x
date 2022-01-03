import { User, Profile, Message } from 'database/database'

import helpers from 'helpers'
import userHelpers from 'routes/user/helpers'

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
        await userHelpers.updateReadByProperty(id, messages)
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
    helpers.validator.validateInteger('limit'),
    helpers.validator.validateInteger('offset')
]

export default getMessages
