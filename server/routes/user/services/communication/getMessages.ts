import { User, Profile, Message } from 'database/database'

import utils from 'utils'

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
            order: [['id', 'DESC']],
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
        }).then(
            async messages =>
                await Promise.all(
                    messages
                        .sort((a, b) => a.id - b.id)
                        .map(async message => {
                            const readByIds = message.readBy.split(',').filter(v => v)
                            const ID = id.toString()
                            if (!readByIds.includes(ID)) {
                                readByIds.push(ID)
                            }
                            await message.update({
                                readBy: readByIds.join(',')
                            })
                            return message
                        })
                )
        )
        res.send({
            messages,
            user: {
                id,
                profile: {
                    name,
                    avatar
                }
            }
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
