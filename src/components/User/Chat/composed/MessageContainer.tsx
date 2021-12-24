import React from 'react'

import StyledMessage from '../styled/Message'

import Composed from '.'

import utils from 'utils'

interface IMessageContainer {
    message: Message
    nextMessage: Message
    currentUser: User | undefined
}

const MessageContainer: React.FC<IMessageContainer> = ({
    message: { type, content, filename, createdAt, user },
    nextMessage,
    currentUser
}) => {
    const withCurrentUser = user.id === currentUser?.id
    const withLastUserMessage = (nextMessage && user.id !== nextMessage.user.id) || !nextMessage
    const showAvatar = () => (
        <StyledMessage.Avatar
            src={user.profile!.avatar}
            onDoubleClick={() => utils.history.push(`/users/${user.id}`)}
            name={user.profile!.name}
            withCurrentUser={withCurrentUser}
        />
    )
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
    return (
        <Composed.Message
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

export default MessageContainer
