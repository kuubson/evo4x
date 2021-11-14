import { User, Profile, Message } from '@database'

import utils from '@utils'

const getMessages = async (req, res, next) => {
    try {
        const {
            id,
            profile: { name }
        } = req.user
        const { limit, offset } = req.body
        const messages = await Message.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            attributes: {
                exclude: 'userId'
            },
            include: [
                {
                    model: User,
                    attributes: ['id'],
                    include: {
                        model: Profile,
                        attributes: ['name']
                    }
                }
            ]
        }).then(
            async messages =>
                await Promise.all(
                    messages
                        .sort((a, b) => a.id - b.id)
                        .map(async message => {
                            const readByIds = message.readBy.split(',').filter(v => v)
                            if (!readByIds.includes(id.toString())) {
                                readByIds.push(id)
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
                    name
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
