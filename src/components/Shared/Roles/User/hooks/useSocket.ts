import { useEffect } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

const useSocket = (chat: boolean | undefined, currentUser: User | undefined) => {
    const { socket, setSocket } = hooks.useSocket()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = hooks.useMessages()
    useEffect(() => {
        if (!socket) {
            setSocket(io('/user'))
        }
    }, [])
    const handleOnSendMessage = (message: Message) => {
        const withoutChatAndCurrentUser = !chat && message.user.id !== currentUser!.id
        if (withoutChatAndCurrentUser) {
            setUnreadMessagesAmount(unreadMessagesAmount + 1)
            !lastUnreadMessageIndex
                ? setLastUnreadMessageIndex(1)
                : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
        }
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
    return {
        socket,
        setSocket
    }
}

export default useSocket
