import { useRef, useEffect, useState } from 'react'

import hooks from 'hooks'

import utils from 'utils'

import chatHelpers from '../helpers'

type ChatHook = {
    setShowFileInput: DispatchBoolean
    setUploadPercentage: DispatchNumber
}

const useChat = ({ setShowFileInput, setUploadPercentage }: ChatHook) => {
    const { socket } = hooks.useSocket()
    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessagesInfo()
    const messagesRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const handleOnSendMessage = (message: Message) => {
        chatHelpers.handleOnSendMessage({
            socket,
            messagesRef,
            message,
            setMessages
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
    }, [socket])
    const getMessages = async ({ event, limit, offset }: MessagesOrAnalysisGetterProps) => {
        chatHelpers.getMessages({
            event,
            limit,
            offset,
            messagesRef,
            hasMoreMessages,
            lastUnreadMessageIndex,
            setMessages,
            setHasMoreMessages,
            setIsLoading,
            setCurrentUser,
            setUnreadMessagesAmount
        })
    }
    useEffect(() => {
        getMessages({
            event: undefined,
            limit: 20,
            offset: 0
        })
        utils.subscribePushNotifications('/api/user/communication/subscribePushNotifications')
    }, [])
    const getUnreadMessages = () => {
        chatHelpers.getUnreadMessages({
            messagesRef,
            lastUnreadMessageIndex,
            setMessages,
            setUnreadMessagesAmount
        })
    }
    const sendMessage = () => {
        chatHelpers.sendMessage({
            socket,
            messagesRef,
            messages,
            message,
            currentUser,
            setMessage,
            setMessages
        })
    }
    const handleSubmittingTextarea = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        chatHelpers.handleSubmittingTextarea({
            event,
            sendMessage
        })
    }
    const sendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        chatHelpers.sendFile({
            event,
            socket,
            messagesRef,
            messages,
            currentUser,
            setMessages,
            setShowFileInput,
            setUploadPercentage
        })
    }
    return {
        messagesRef,
        messages,
        message,
        isLoading,
        currentUser,
        setMessage,
        getMessages,
        getUnreadMessages,
        sendMessage,
        handleSubmittingTextarea,
        sendFile
    }
}

export default useChat
