import * as StyledMessage from 'components/user/Chat/modules/Message/styled'

import MessageContent from 'components/user/Chat/modules/Message/components/MessageContent'

interface IAnalysis {
   analysis: Analysis
   nextAnalysis: Analysis
}

const Analysis = ({
   analysis: { type, content, filename, createdAt, views },
   nextAnalysis,
}: IAnalysis) => {
   const withLastUserMessage = !nextAnalysis
   const showError = (error: string) => (
      <StyledMessage.Content withCurrentUser withLastUserMessage={withLastUserMessage} withError>
         {error}
      </StyledMessage.Content>
   )
   return (
      <MessageContent
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
