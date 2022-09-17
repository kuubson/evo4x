import * as Styled from './styled'

import { history } from 'utils'

import MessageContent from './components/MessageContent'

interface IMessage {
   message: Message
   nextMessage: Message
   currentUser: User | undefined
}

const Message = ({
   message: { type, content, filename, createdAt, user },
   nextMessage,
   currentUser,
}: IMessage) => {
   const withCurrentUser = user.id === currentUser?.id
   const withLastUserMessage = (nextMessage && user.id !== nextMessage.user.id) || !nextMessage
   const showAvatar = () => (
      <Styled.Avatar
         src={user.profile!.avatar}
         onDoubleClick={() => history.push(`/users/${user.id}`)}
         name={user.profile!.name}
         withCurrentUser={withCurrentUser}
      />
   )
   const showError = (error: string) => (
      <Styled.Content
         withCurrentUser={withCurrentUser}
         withLastUserMessage={withLastUserMessage}
         withError
      >
         {error}
         {withLastUserMessage && showAvatar()}
      </Styled.Content>
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
