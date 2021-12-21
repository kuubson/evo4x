import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'

import hooks from 'hooks'

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

type Response = {
    user: User
    messages: Message[]
}

const Chat = () => {
    const { socket } = hooks.useSocket()
    const messagesRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessages()
    const [showFileInput, setShowFileInput] = useState(true)
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const fileUpload = !!uploadPercentage
    const getMessages = async (
        limit: number,
        offset: number,
        e: React.UIEvent<HTMLDivElement> | undefined
    ) => {
        const url = '/api/user/communication/getMessages'
        if (e) {
            const target = e.target as any
            if (target.scrollTop <= 0 && hasMoreMessages) {
                const response = await utils.axios.post<Response>(url, {
                    limit,
                    offset
                })
                if (response) {
                    const { messages } = response.data
                    setHasMoreMessages(messages.length !== 0)
                    const lastScroll = target.scrollHeight
                    setMessages(_messages => [...messages, ..._messages])
                    target.scrollTop = target.scrollHeight - lastScroll
                    if (messages.length + messages.length >= lastUnreadMessageIndex!) {
                        setUnreadMessagesAmount(0)
                    }
                }
            }
        }
        if (!e) {
            const response = await utils.axios.post<Response>(url, {
                limit,
                offset
            })
            if (response) {
                setIsLoading(false)
                const { user, messages } = response.data
                setCurrentUser(user)
                setMessages(messages)
                chatHelpers.pushToTheBottom(messagesRef, true)
                if (messages.length >= lastUnreadMessageIndex!) {
                    setUnreadMessagesAmount(0)
                }
            }
        }
    }
    useEffect(() => {
        getMessages(20, 0, undefined)
        utils.subscribePushNotifications('/api/user/communication/subscribePushNotifications')
    }, [])
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
    const getUnreadMessages = async () => {
        const url = '/api/user/communication/getMessages'
        const response = await utils.axios.post<Response>(url, {
            limit: lastUnreadMessageIndex,
            offset: 0
        })
        if (response) {
            const { messages } = response.data
            setMessages(messages)
            setTimeout(() => {
                messagesRef.current!.scrollTop = 0
            }, 0)
            setUnreadMessagesAmount(0)
        }
    }
    const sendMessage = async () => {
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
    const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let intervalId: any
        let percentage = 0
        const file = e.currentTarget.files![0]
        if (file) {
            const path = e.target.value
            const { name, size } = file
            const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
            const videoExtensions = /\.(mp4)$/i
            const fileExtensions = /\.(txt|rtf|doc|docx|xlsx|ppt|pptx|pdf)$/i
            const isImage = imageExtensions.test(path) || imageExtensions.test(name)
            const isVideo = videoExtensions.test(path) || videoExtensions.test(name)
            const isFile = fileExtensions.test(path) || fileExtensions.test(name)
            const resetFileInput = () => {
                setShowFileInput(false)
                setTimeout(() => {
                    setShowFileInput(true)
                }, 0)
            }
            const largeSizeError = () => {
                return utils.setApiFeedback('You cannot send this large file')
            }
            if (!isImage && !isVideo && !isFile) {
                resetFileInput()
                return utils.setApiFeedback('You cannot send a file with this extension')
            }
            if (isImage) {
                if (size > 31457280) {
                    resetFileInput() // 30MB
                    largeSizeError()
                }
            }
            if (isVideo) {
                if (size > 52428800) {
                    resetFileInput() // 50MB
                    largeSizeError()
                }
            }
            if (isFile) {
                if (size > 10485760) {
                    resetFileInput() // 10MB
                    largeSizeError()
                }
            }
            const form = new FormData()
            form.append('file', file)
            try {
                const url = '/api/user/communication/sendFile'
                intervalId = setInterval(() => {
                    if (percentage < 100) {
                        percentage++
                        setUploadPercentage(percentage => percentage + 1)
                    }
                }, 500)
                const response = await axios.post(url, form)
                if (response) {
                    setUploadPercentage(100)
                    clearInterval(intervalId)
                    setTimeout(() => {
                        setUploadPercentage(0)
                    }, 800)
                    const { type, content } = response.data
                    const lastMessage = messages[messages.length - 1]
                    const id = lastMessage ? lastMessage.id + 1 : 0
                    const message = {
                        id,
                        type,
                        content,
                        createdAt: new Date(),
                        user: currentUser
                    }
                    setMessages([...messages, message] as Message[])
                    chatHelpers.pushToTheBottom(messagesRef)
                    resetFileInput()
                    socket!.emit('sendMessage', message)
                }
            } catch (error) {
                resetFileInput()
                clearInterval(intervalId)
                setUploadPercentage(0)
            }
        }
    }
    const areThereMessages = !!messages.length
    return (
        <ChatContainer>
            {!isLoading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
                <Dashboard.UnreadMessagesInfo onClick={getUnreadMessages}>
                    Unread messages
                </Dashboard.UnreadMessagesInfo>
            )}
            <Dashboard.Content>
                <Dashboard.Messages
                    ref={messagesRef}
                    onTouchStart={() => textareaRef.current && textareaRef.current.blur()}
                    onScroll={e => getMessages(20, messages.length, e)}
                >
                    {!isLoading &&
                        (areThereMessages ? (
                            messages.map(({ id, type, content, createdAt, user }, index) => {
                                const nextMessage = messages[index + 1]
                                return (
                                    <Composed.Message
                                        key={id}
                                        message={{
                                            id,
                                            type,
                                            content,
                                            createdAt,
                                            user
                                        }}
                                        nextMessage={nextMessage}
                                        currentUser={currentUser}
                                    />
                                )
                            })
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
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                switch (true) {
                                    case utils.detectMobileDevice():
                                        return
                                    case !e.currentTarget.value.trim():
                                        e.preventDefault()
                                        break
                                    case !e.shiftKey:
                                        sendMessage()
                                        break
                                }
                            }
                        }}
                    />
                    <StyledTextarea.Buttons>
                        {showFileInput && <Dashboard.FileInput onChange={sendFile} />}
                        {fileUpload ? (
                            <Composed.ProgressLoader percentage={uploadPercentage} />
                        ) : (
                            <StyledTextarea.Button as="label" htmlFor="file">
                                Upload 📁
                            </StyledTextarea.Button>
                        )}
                        <StyledTextarea.Button
                            onClick={() => {
                                sendMessage()
                                if (utils.detectMobileDevice()) {
                                    textareaRef.current!.focus()
                                }
                            }}
                        >
                            Send ✉️
                        </StyledTextarea.Button>
                    </StyledTextarea.Buttons>
                </StyledTextarea.Container>
            </Dashboard.Content>
        </ChatContainer>
    )
}

export default Chat
