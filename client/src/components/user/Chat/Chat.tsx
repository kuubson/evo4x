import styled from 'styled-components/macro'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

import Message from './modules/Message/Message'
import Textarea from './modules/Textarea/Textarea'

import * as Dashboard from './styled/Dashboard'

import { useMessagesInfo } from 'hooks'
import { useChat, useTextarea } from './hooks'

const ChatContainer = styled.section`
    height: 100%;
    position: relative;
`

const Chat = () => {
    const { lastUnreadMessageIndex } = useMessagesInfo()
    const { textareaRef, showFileInput, setShowFileInput, uploadPercentage, setUploadPercentage } =
        useTextarea()
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
                <Textarea
                    message={message}
                    setMessage={setMessage}
                    textareaRef={textareaRef}
                    showFileInput={showFileInput}
                    uploadPercentage={uploadPercentage}
                    sendMessage={sendMessage}
                    sendFile={sendFile}
                />
            </Dashboard.Content>
        </ChatContainer>
    )
}

export default Chat
