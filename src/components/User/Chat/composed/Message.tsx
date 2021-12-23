import React from 'react'

import chatHooks from 'components/User/Chat/hooks'

import StyledMessage from '../styled/Message'

import utils from 'utils'

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
        <StyledMessage.Avatar
            src={user.profile!.avatar}
            name={user.profile!.name}
            onDoubleClick={() => utils.history.push(`/users/${user.id}`)}
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
    const { renderMessage } = chatHooks.useRender({
        type,
        content,
        filename,
        createdAt,
        showAvatar,
        showError,
        withCurrentUser,
        withLastUserMessage,
        withLastAndNextMessage: !!withLastUserMessage && !!nextMessage
    })
    return renderMessage()
}

export default Message
