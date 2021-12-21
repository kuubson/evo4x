import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import fileSaver from 'file-saver'

import StyledMessage from 'components/User/Chat/styled/Message'

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

type UseMessagesHook = {
    type: MessageTypes
    content: string
    createdAt: Date
    views?: number
    showAvatar?: () => JSX.Element
    showError: (error: string) => JSX.Element
    withCurrentUser: boolean
    withLastUserMessage: boolean
    withLastAndNextMessage: boolean
}

const useMessages = ({
    type,
    content,
    createdAt,
    views,
    showAvatar,
    showError,
    withCurrentUser,
    withLastUserMessage,
    withLastAndNextMessage
}: UseMessagesHook) => {
    const [showDetails, setShowDetails] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    useEffect(() => {
        if (showDetails) {
            setTimeout(() => setShowDetails(false), 3000)
        }
    }, [showDetails])
    const handleFileLoadingError = () =>
        type === 'IMAGE' ? setImageError(true) : setVideoError(true)
    const date = new Date(createdAt)
    const withFile = type === 'FILE'
    const renderMessage = () => (
        <MessageContainer
            onClick={() => setShowDetails(true)}
            withLastUserMessage={withLastAndNextMessage}
        >
            {type === 'IMAGE' ? (
                imageError ? (
                    showError('Image has failed to load')
                ) : (
                    <StyledMessage.AssetContainer withCurrentUser={withCurrentUser}>
                        <StyledMessage.Image src={content} onError={handleFileLoadingError} />
                        {withLastUserMessage && showAvatar && showAvatar()}
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
                        {withLastUserMessage && showAvatar && showAvatar()}
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
                    {withLastUserMessage && showAvatar && showAvatar()}
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
                    {views && `, ${views}👁️`}
                </StyledMessage.Date>
            )}
        </MessageContainer>
    )
    return {
        renderMessage
    }
}

export default useMessages
