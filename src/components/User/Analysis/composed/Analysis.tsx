import React from 'react'

import chatHooks from 'components/User/Chat/hooks'

import ChatStyledMessage from 'components/User/Chat/styled/Message'

interface IAnalysis {
    analysis: Analysis
    nextAnalysis: Analysis
}

const Message: React.FC<IAnalysis> = ({
    analysis: { type, content, filename, createdAt, views },
    nextAnalysis
}) => {
    const withLastUserMessage = !nextAnalysis
    const showError = (error: string) => (
        <ChatStyledMessage.Content
            withCurrentUser
            withLastUserMessage={withLastUserMessage}
            withError
        >
            {error}
        </ChatStyledMessage.Content>
    )
    const { renderMessage: renderAnalysis } = chatHooks.useMessages({
        type,
        content,
        filename,
        createdAt,
        views,
        showError,
        withCurrentUser: true,
        withLastUserMessage,
        withLastAndNextMessage: !!withLastUserMessage && !!nextAnalysis
    })
    return renderAnalysis()
}

export default Message
