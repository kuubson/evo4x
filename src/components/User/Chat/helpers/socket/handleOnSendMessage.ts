import { Socket } from 'socket.io-client'

import chatHelpers from '../../helpers'

type OnSendMessageHandler = {
    socket: Socket | undefined
    messagesRef: React.RefObject<HTMLDivElement>
    message: Message
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const handleOnSendMessage = ({
    socket,
    messagesRef,
    message,
    setMessages
}: OnSendMessageHandler) => {
    setMessages(messages => [...messages, message])
    chatHelpers.pushToTheBottom(messagesRef)
    socket!.emit('readMessages')
}

export default handleOnSendMessage
