import { useEffect } from 'react'
import io from 'socket.io-client'

import hooks from 'hooks'

type SocketHook = {
    chat: boolean | undefined
    currentUser: User | undefined
}

const useSocket = ({ chat, currentUser }: SocketHook) => {
    const { socket, setSocket, clearSocket } = hooks.useSocket()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = hooks.useMessagesInfo()
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
        clearSocket
    }
}

export default useSocket
