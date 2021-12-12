import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import fileSaver from 'file-saver'

import StyledMessage from '../styled/Message'

import utils from 'utils'

type MessageContainerType = {
    withLastUserMessage?: boolean
}

const MessageContainer = styled.div<MessageContainerType>`
    display: flex;
    flex-direction: column;
    ${({ withLastUserMessage }) =>
        withLastUserMessage
            ? css`
                  margin-bottom: 15px;
              `
            : null}
`

interface IMessage {
    message: Message
    nextMessage: Message
    currentUser: User | undefined
}

const Message: React.FC<IMessage> = ({
    message: { type, content, createdAt, user },
    nextMessage,
    currentUser
}) => {
    const date = new Date(createdAt)
    const withCurrentUser = user.id === currentUser?.id
    const withLastUserMessage = (nextMessage && user.id !== nextMessage.user.id) || !nextMessage
    const withFile = type === 'FILE'
    const [showDetails, setShowDetails] = useState(false)
    useEffect(() => {
        if (showDetails) {
            setTimeout(() => setShowDetails(false), 3000)
        }
    }, [showDetails])
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const handleFileLoadingError = () =>
        type === 'IMAGE' ? setImageError(true) : setVideoError(true)
    const showError = (error: string) => (
        <StyledMessage.Content
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
            withError
        >
            {error}
            {withLastUserMessage && showAvatar()}
        </StyledMessage.Content>
    )
    const showAvatar = () => (
        <StyledMessage.Avatar
            src={user.profile!.avatar}
            name={user.profile!.name}
            onDoubleClick={() => utils.history.push(`/users/${user.id}`)}
            withCurrentUser={withCurrentUser}
        />
    )
    return (
        <MessageContainer
            onClick={() => setShowDetails(true)}
            withLastUserMessage={!!withLastUserMessage && !!nextMessage}
        >
            {type === 'IMAGE' ? (
                imageError ? (
                    showError('Image has failed to load')
                ) : (
                    <StyledMessage.AssetContainer withCurrentUser={withCurrentUser}>
                        <StyledMessage.Image src={content} onError={handleFileLoadingError} />
                        {withLastUserMessage && showAvatar()}
                    </StyledMessage.AssetContainer>
                )
            ) : type === 'VIDEO' ? (
                videoError ? (
                    showError('Video has failed to load')
                ) : (
                    <StyledMessage.AssetContainer withCurrentUser={withCurrentUser}>
                        <StyledMessage.Video
                            src={content}
                            onError={handleFileLoadingError}
                            controls
                        />
                        {withLastUserMessage && showAvatar()}
                    </StyledMessage.AssetContainer>
                )
            ) : (
                <StyledMessage.Content
                    onClick={() => {
                        if (withFile) {
                            fileSaver.saveAs(content, content.split('filename')[1])
                        }
                    }}
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    withFile={withFile}
                >
                    {withFile ? content.split('filename')[1] : content}
                    {withLastUserMessage && showAvatar()}
                </StyledMessage.Content>
            )}
            {(withLastUserMessage || showDetails) && (
                <StyledMessage.Date
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    showDetails={showDetails}
                >
                    {new Date().toDateString() === date.toDateString()
                        ? date.toLocaleTimeString()
                        : date.toLocaleString()}
                </StyledMessage.Date>
            )}
        </MessageContainer>
    )
}

export default Message
