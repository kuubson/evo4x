import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

import userHelpers from 'components/Shared/Roles/User/helpers'

const useHelpers = (chat: boolean | undefined) => {
    const { socket, setSocket } = hooks.useSocket()
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
    const getUnreadMessagesInfo = () => {
        userHelpers.getUnreadMessagesInfo({
            setCurrentUser,
            setLastUnreadMessageIndex,
            setUnreadMessagesAmount
        })
    }
    const checkRole = () => {
        userHelpers.checkRole(role)
    }
    useEffect(() => {
        if (!socket) {
            setSocket(io('/user'))
        }
        checkRole()
        getUnreadMessagesInfo()
    }, [])
}

export default useHelpers
