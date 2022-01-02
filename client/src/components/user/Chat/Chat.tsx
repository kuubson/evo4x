import { useRef, useState } from 'react'
import styled from 'styled-components/macro'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

import Message from './modules/Message/Message'
import ProgressLoader from './modules/ProgressLoader/ProgressLoader'

import * as Dashboard from './styled/Dashboard'
import * as StyledTextarea from './styled/Textarea'

import { useMessagesInfo } from 'hooks'
import { useChat } from './hooks'

import { detectMobileDevice } from 'helpers'

const ChatContainer = styled.section`
    height: 100%;
    position: relative;
`

const Chat = () => {
    const { lastUnreadMessageIndex } = useMessagesInfo()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showFileInput, setShowFileInput] = useState(true)
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const {
        messagesRef,
        messages,
        message,
        isLoading,
        currentUser,
        setMessage,
        getMessages,
        getUnreadMessages,
        sendMessage,
        sendFile
    } = useChat({
        setShowFileInput,
        setUploadPercentage
    })
    const areThereMessages = !!messages.length
    const areThereUnreadMessages =
        !isLoading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex
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
                            messages.map((message, index) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    nextMessage={messages[index + 1]}
                                    currentUser={currentUser}
                                />
                            ))
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
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setMessage(event.target.value)
                        }
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                switch (true) {
                                    case detectMobileDevice():
                                        return
                                    case !event.currentTarget.value.trim():
                                        event.preventDefault()
                                        break
                                    case !event.shiftKey:
                                        sendMessage()
                                        break
                                }
                            }
                        }}
                    />
                    <StyledTextarea.Buttons>
                        {showFileInput && <Dashboard.FileInput onChange={sendFile} />}
                        {fileUploadInProgress ? (
                            <ProgressLoader percentage={uploadPercentage} />
                        ) : (
                            <StyledTextarea.Button as="label" htmlFor="file">
                                Upload 📁
                            </StyledTextarea.Button>
                        )}
                        <StyledTextarea.Button
                            onClick={() => {
                                sendMessage()
                                if (detectMobileDevice()) {
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
