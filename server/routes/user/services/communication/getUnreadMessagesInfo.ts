import { Message } from 'database/database'

import { ProtectedRoute } from 'types/express'

const getUnreadMessagesInfo: ProtectedRoute = async (req, res, next) => {
    try {
        const { id } = req.user
        const { lastUnreadMessageIndex, unreadMessagesAmount } = await Message.findAll().then(
            messages => {
                let lastUnreadMessageIndex: number | undefined
                let unreadMessagesAmount = 0
                messages.map(({ readBy }, index) => {
                    const readByIds = readBy.split(',').filter(v => v)
                    if (!readByIds.includes(id.toString())) {
                        unreadMessagesAmount++
                        if (!lastUnreadMessageIndex) {
                            lastUnreadMessageIndex = messages.length - index
                        }
                    }
                })
                return {
                    lastUnreadMessageIndex,
                    unreadMessagesAmount
                }
            }
        )
        res.send({
            user: {
                id
            },
            lastUnreadMessageIndex,
            unreadMessagesAmount
        })
    } catch (error) {
        next(error)
    }
}

export default getUnreadMessagesInfo
