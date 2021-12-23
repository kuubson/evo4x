import { useRef, useEffect, useState } from 'react'

import chatHooks from '.'
import hooks from 'hooks'

import Composed from '../composed'

import utils from 'utils'

import chatHelpers from 'components/User/Chat/helpers'

type MessagesHook = {
    setShowFileInput: DispatchBoolean
    setUploadPercentage: DispatchNumber
}

const useMessages = ({ setShowFileInput, setUploadPercentage }: MessagesHook) => {
    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessagesInfo()
    const messagesRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const { socket } = chatHooks.useSocket({
        messagesRef,
        setMessages
    })
    const [isLoading, setIsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | undefined>()
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
    const getUnreadMessages = () =>
        chatHelpers.getUnreadMessages({
            messagesRef,
            lastUnreadMessageIndex,
            setMessages,
            setUnreadMessagesAmount
        })
    const renderMessages = () => {
        return messages.map((message, index) => {
            const nextMessage = messages[index + 1]
            return (
                <Composed.MessageContainer
                    key={message.id}
                    message={message}
                    nextMessage={nextMessage}
                    currentUser={currentUser}
                />
            )
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
    const areThereMessages = !!messages.length
    const areThereUnreadMessages =
        !isLoading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex
    return {
        messagesRef,
        messages,
        message,
        isLoading,
        areThereMessages,
        areThereUnreadMessages,
        setMessage,
        getMessages,
        getUnreadMessages,
        renderMessages,
        sendMessage,
        handleSubmittingTextarea,
        sendFile
    }
}

export default useMessages
