import { Socket } from 'socket.io-client'
import axios from 'axios'

import utils from 'utils'

import chatHelpers from '.'

type MessageSender = {
    socket: Socket | undefined
    messagesRef: React.RefObject<HTMLDivElement>
    messages: Message[]
    message: string
    currentUser: User | undefined
    setMessage: DispatchString
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const sendMessage = async ({
    socket,
    messagesRef,
    messages,
    message,
    currentUser,
    setMessage,
    setMessages
}: MessageSender) => {
    if (message.trim()) {
        const lastMessage = messages[messages.length - 1]
        const id = lastMessage ? lastMessage.id + 1 : 0
        const _message = {
            id,
            type: 'MESSAGE',
            content: message,
            createdAt: new Date(),
            user: currentUser
        }
        setMessages(messages => [...messages, _message] as Message[])
        chatHelpers.pushToTheBottom(messagesRef)
        setTimeout(() => setMessage(''), 0)
        try {
            const url = '/api/user/communication/sendMessage'
            const response = await axios.post(url, {
                content: message
            })
            if (response) {
                socket!.emit('sendMessage', _message)
            }
        } catch (error) {
            const conversation = messages
            setMessages(conversation)
            utils.handleApiError(error)
        }
    }
}

export default sendMessage
