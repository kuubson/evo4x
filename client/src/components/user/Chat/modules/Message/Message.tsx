import React from 'react'

import MessageContent from './components/MessageContent'

import * as Dashboard from './styled/Dashboard'

import { history } from 'utils'

interface IMessage {
    message: Message
    nextMessage: Message
    currentUser: User | undefined
}

const Message: React.FC<IMessage> = ({
    message: { type, content, filename, createdAt, user },
    nextMessage,
    currentUser
}) => {
    const withCurrentUser = user.id === currentUser?.id
    const withLastUserMessage = (nextMessage && user.id !== nextMessage.user.id) || !nextMessage
    const showAvatar = () => (
        <Dashboard.Avatar
            src={user.profile!.avatar}
            onDoubleClick={() => history.push(`/users/${user.id}`)}
            name={user.profile!.name}
            withCurrentUser={withCurrentUser}
        />
    )
    const showError = (error: string) => (
        <Dashboard.Content
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
            withError
        >
            {error}
            {withLastUserMessage && showAvatar()}
        </Dashboard.Content>
    )
    return (
        <MessageContent
            type={type}
            content={content}
            filename={filename}
            createdAt={createdAt}
            showAvatar={showAvatar}
            showError={showError}
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
            withLastAndNextMessage={!!withLastUserMessage && !!nextMessage}
        />
    )
}

export default Message
