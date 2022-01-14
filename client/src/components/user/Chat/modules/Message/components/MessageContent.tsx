import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import fileSaver from 'file-saver'

import * as Styled from '../styled'

type StyledProps = {
    withLastUserMessage: boolean
}

const MessageContentContainer = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    ${({ withLastUserMessage }) =>
        withLastUserMessage
            ? css`
                  margin-bottom: 15px;
              `
            : null}
`

interface IMessageContent {
    type: MessageTypes
    content: string
    filename: string | undefined
    createdAt: Date
    views?: number
    showAvatar?: () => JSX.Element
    showError: (error: string) => JSX.Element
    withCurrentUser: boolean
    withLastUserMessage: boolean
    withLastAndNextMessage: boolean
}

const MessageContent = ({
    type,
    content,
    filename,
    createdAt,
    views,
    showAvatar,
    showError,
    withCurrentUser,
    withLastUserMessage,
    withLastAndNextMessage
}: IMessageContent) => {
    const [showDetails, setShowDetails] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    useEffect(() => {
        if (showDetails) {
            setTimeout(() => setShowDetails(false), 3000)
        }
    }, [showDetails])
    const handleFileLoadingError = () => {
        type === 'IMAGE' ? setImageError(true) : setVideoError(true)
    }
    const date = new Date(createdAt)
    const withFile = type === 'FILE'
    return (
        <MessageContentContainer
            onClick={() => setShowDetails(true)}
            withLastUserMessage={withLastAndNextMessage}
        >
            {type === 'IMAGE' ? (
                imageError ? (
                    showError('Image has failed to load')
                ) : (
                    <Styled.AssetContainer withCurrentUser={withCurrentUser}>
                        <Styled.Image src={content} onError={handleFileLoadingError} />
                        {withLastUserMessage && showAvatar && showAvatar()}
                    </Styled.AssetContainer>
                )
            ) : type === 'VIDEO' ? (
                videoError ? (
                    showError('Video has failed to load')
                ) : (
                    <Styled.AssetContainer withCurrentUser={withCurrentUser}>
                        <Styled.Video src={content} onError={handleFileLoadingError} controls />
                        {withLastUserMessage && showAvatar && showAvatar()}
                    </Styled.AssetContainer>
                )
            ) : (
                <Styled.Content
                    onClick={() => {
                        if (withFile) {
                            fileSaver.saveAs(content, filename)
                        }
                    }}
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    withFile={withFile}
                >
                    {withFile ? filename : content}
                    {withLastUserMessage && showAvatar && showAvatar()}
                </Styled.Content>
            )}
            {(withLastUserMessage || showDetails) && (
                <Styled.Date
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    showDetails={showDetails}
                >
                    {new Date().toDateString() === date.toDateString()
                        ? date.toLocaleTimeString()
                        : date.toLocaleString()}
                    {views && `, ${views}👁️`}
                </Styled.Date>
            )}
        </MessageContentContainer>
    )
}

export default MessageContent
