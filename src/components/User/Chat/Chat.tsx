import { useRef, useState } from 'react'
import styled from 'styled-components/macro'

import chatHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import Dashboard from './styled/Dashboard'
import StyledTextarea from './styled/Textarea'

import Composed from './composed'

import utils from 'utils'

const ChatContainer = styled.section`
    height: 100%;
    position: relative;
`

const Chat = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showFileInput, setShowFileInput] = useState(true)
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const {
        messagesRef,
        messages,
        message,
        isLoading,
        currentUser,
        areThereMessages,
        areThereUnreadMessages,
        setMessage,
        getMessages,
        getUnreadMessages,
        sendMessage,
        handleSubmittingTextarea,
        sendFile
    } = chatHooks.useMessages({
        setShowFileInput,
        setUploadPercentage
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
    const fileUploadInProgress = !!uploadPercentage
    return (
        <ChatContainer>
            {areThereUnreadMessages && (
                <Dashboard.UnreadMessagesInfo onClick={getUnreadMessages}>
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
                        disabled={fileUploadInProgress}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={handleSubmittingTextarea}
                    />
                    <StyledTextarea.Buttons>
                        {showFileInput && <Dashboard.FileInput onChange={sendFile} />}
                        {fileUploadInProgress ? (
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
