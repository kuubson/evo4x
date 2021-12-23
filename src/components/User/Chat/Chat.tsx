import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import chatHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import Dashboard from './styled/Dashboard'
import StyledTextarea from './styled/Textarea'

import Composed from './composed'

import utils from 'utils'

import chatHelpers from './helpers'

const ChatContainer = styled.section`
    height: 100%;
    position: relative;
`

const Chat = () => {
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessagesInfo()
    const { socket } = chatHooks.useSocket({
        messagesRef,
        setMessages
    })
    const [showFileInput, setShowFileInput] = useState(true)
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const fileUpload = !!uploadPercentage
    const getMessages = async ({ event, limit, offset }: MessagesOrAnalysisGetterProps) =>
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
    const sendMessage = () =>
        chatHelpers.sendMessage({
            socket,
            messagesRef,
            messages,
            message,
            currentUser,
            setMessage,
            setMessages
        })
    useEffect(() => {
        getMessages({
            event: undefined,
            limit: 20,
            offset: 0
        })
        utils.subscribePushNotifications('/api/user/communication/subscribePushNotifications')
    }, [])
    const renderMessages = () =>
        messages.map((message, index) => {
            const nextMessage = messages[index + 1]
            return (
                <Composed.Message
                    key={message.id}
                    message={message}
                    nextMessage={nextMessage}
                    currentUser={currentUser}
                />
            )
        })
    const handleSendButton = () => {
        sendMessage()
        if (utils.detectMobileDevice()) {
            textareaRef.current!.focus()
        }
    }
    const areThereMessages = !!messages.length
    const areThereUnreadMessages =
        !isLoading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex
    return (
        <ChatContainer>
            {areThereUnreadMessages && (
                <Dashboard.UnreadMessagesInfo
                    onClick={() =>
                        chatHelpers.getUnreadMessages({
                            messagesRef,
                            lastUnreadMessageIndex,
                            setMessages,
                            setUnreadMessagesAmount
                        })
                    }
                >
                    Unread messages
                </Dashboard.UnreadMessagesInfo>
            )}
            <Dashboard.Content>
                <Dashboard.Messages
                    ref={messagesRef}
                    onTouchStart={() => textareaRef.current && textareaRef.current.blur()}
                    onScroll={event =>
                        getMessages({
                            event,
                            limit: 20,
                            offset: messages.length
                        })
                    }
                >
                    {!isLoading &&
                        (areThereMessages ? (
                            renderMessages()
                        ) : (
                            <Dashboard.Warning>There are no messages yet</Dashboard.Warning>
                        ))}
                </Dashboard.Messages>
                <Dashboard.Error>
                    <ApiFeedback />
                </Dashboard.Error>
                <StyledTextarea.Container>
                    <StyledTextarea.Content
                        ref={textareaRef}
                        value={message}
                        placeholder="Type your message"
                        disabled={fileUpload}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={event =>
                            chatHelpers.handleSubmittingTextarea({
                                event,
                                sendMessage
                            })
                        }
                    />
                    <StyledTextarea.Buttons>
                        {showFileInput && (
                            <Dashboard.FileInput
                                onChange={event =>
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
                            />
                        )}
                        {fileUpload ? (
                            <Composed.ProgressLoader percentage={uploadPercentage} />
                        ) : (
                            <StyledTextarea.Button as="label" htmlFor="file">
                                Upload 📁
                            </StyledTextarea.Button>
                        )}
                        <StyledTextarea.Button onClick={handleSendButton}>
                            Send ✉️
                        </StyledTextarea.Button>
                    </StyledTextarea.Buttons>
                </StyledTextarea.Container>
            </Dashboard.Content>
        </ChatContainer>
    )
}

export default Chat
