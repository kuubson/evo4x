import handleOnSendMessage from './socket/handleOnSendMessage'

import getMessages from './getMessages'
import getUnreadMessages from './getUnreadMessages'
import sendMessage from './sendMessage'
import handleSubmittingTextarea from './handleSubmittingTextarea'
import sendFile from './sendFile'
import pushToTheBottom from './pushToTheBottom'

const chatHelpers = {
    handleOnSendMessage,
    getMessages,
    getUnreadMessages,
    sendMessage,
    handleSubmittingTextarea,
    sendFile,
    pushToTheBottom
}

export default chatHelpers
