import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import fileSaver from 'file-saver'

import CStyledMessage from 'components/User/Chat/styled/Message'

type AnalysisContainerType = {
    withLastUserMessage?: boolean
}

const AnalysisContainer = styled.div<AnalysisContainerType>`
    display: flex;
    flex-direction: column;
    ${({ withLastUserMessage }) =>
        withLastUserMessage
            ? css`
                  margin-bottom: 15px;
              `
            : null}
`

interface IAnalysis {
    analysis: Analysis
    nextAnalysis: Analysis
}

const Message: React.FC<IAnalysis> = ({
    analysis: { type, content, createdAt, views },
    nextAnalysis
}) => {
    const date = new Date(createdAt)
    const withLastUserMessage = !nextAnalysis
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
        <CStyledMessage.Content withCurrentUser withLastUserMessage={withLastUserMessage} withError>
            {error}
        </CStyledMessage.Content>
    )
    return (
        <AnalysisContainer
            onClick={() => setShowDetails(true)}
            withLastUserMessage={!!withLastUserMessage && !!nextAnalysis}
        >
            {type === 'IMAGE' ? (
                imageError ? (
                    showError('Image has failed to load')
                ) : (
                    <CStyledMessage.AssetContainer withCurrentUser>
                        <CStyledMessage.Image src={content} onError={handleFileLoadingError} />
                    </CStyledMessage.AssetContainer>
                )
            ) : type === 'VIDEO' ? (
                videoError ? (
                    showError('Video has failed to load')
                ) : (
                    <CStyledMessage.AssetContainer withCurrentUser>
                        <CStyledMessage.Video
                            src={content}
                            onError={handleFileLoadingError}
                            controls
                        />
                    </CStyledMessage.AssetContainer>
                )
            ) : (
                <CStyledMessage.Content
                    onClick={() => {
                        if (withFile) {
                            fileSaver.saveAs(content, content.split('filename')[1])
                        }
                    }}
                    withCurrentUser
                    withLastUserMessage={withLastUserMessage}
                    withFile={withFile}
                >
                    {withFile ? content.split('filename')[1] : content}
                </CStyledMessage.Content>
            )}
            {(withLastUserMessage || showDetails) && (
                <CStyledMessage.Date
                    withCurrentUser
                    withLastUserMessage={withLastUserMessage}
                    showDetails={showDetails}
                >
                    {new Date().toDateString() === date.toDateString()
                        ? date.toLocaleTimeString()
                        : date.toLocaleString()}
                    {`, ${views}👁️`}
                </CStyledMessage.Date>
            )}
        </AnalysisContainer>
    )
}

export default Message
