import { useEffect } from 'react'

import hooks from 'hooks'

import chatHelpers from 'components/User/Chat/helpers'

type SocketHook = {
    messagesRef: React.RefObject<HTMLDivElement>
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const useSocket = ({ messagesRef, setMessages }: SocketHook) => {
    const { socket } = hooks.useSocket()
    useEffect(() => {
        const handleOnSendMessage = (message: Message) => {
            setMessages(messages => [...messages, message])
            chatHelpers.pushToTheBottom(messagesRef)
            socket!.emit('readMessages')
        }
        if (socket) {
            socket.on('sendMessage', handleOnSendMessage)
        }
        return () => {
            if (socket) {
                socket.off('sendMessage', handleOnSendMessage)
            }
        }
    }, [socket])
    return {
        socket
    }
}

export default useSocket
