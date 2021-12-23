import React from 'react'

import ChatStyledMessage from 'components/User/Chat/styled/Message'

import ChatComposed from 'components/User/Chat/composed'

interface IAnalysis {
    analysis: Analysis
    nextAnalysis: Analysis
}

const Analysis: React.FC<IAnalysis> = ({
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
    return (
        <ChatComposed.Message
            type={type}
            content={content}
            filename={filename}
            createdAt={createdAt}
            views={views}
            showError={showError}
            withCurrentUser={true}
            withLastUserMessage={withLastUserMessage}
            withLastAndNextMessage={!!withLastUserMessage && !!nextAnalysis}
        />
    )
}

export default Analysis
