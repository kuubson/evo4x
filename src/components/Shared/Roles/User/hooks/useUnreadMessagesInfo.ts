import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

import userHelpers from 'components/Shared/Roles/User/helpers'

const useUnreadMessagesInfo = (chat: boolean | undefined) => {
    const { socket, setSocket, clearSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = hooks.useMessagesInfo()
    const [currentUser, setCurrentUser] = useState<User>()
    const handleOnSendMessage = (message: Message) => {
        userHelpers.handleOnSendMessage(message, {
            chat,
            currentUser,
            lastUnreadMessageIndex,
            unreadMessagesAmount,
            setLastUnreadMessageIndex,
            setUnreadMessagesAmount
        })
    }
    useEffect(() => {
        if (socket) {
            socket.on('sendMessage', handleOnSendMessage)
        }
        return () => {
            if (socket) {
                socket.off('sendMessage', handleOnSendMessage)
            }
        }
    }, [socket, currentUser, unreadMessagesAmount])
    useEffect(() => {
        if (!socket) {
            setSocket(io('/user'))
        }
        userHelpers.checkRole(role)
        userHelpers.getUnreadMessagesInfo({
            setCurrentUser,
            setLastUnreadMessageIndex,
            setUnreadMessagesAmount
        })
    }, [])
    return {
        clearSocket
    }
}

export default useUnreadMessagesInfo
