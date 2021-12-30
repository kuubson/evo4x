import handleOnSendMessage from './socket/handleOnSendMessage'

import checkRole from './checkRole'
import getUnreadMessagesInfo from './getUnreadMessagesInfo'
import logout from './logout'

const userHelpers = {
    handleOnSendMessage,
    checkRole,
    getUnreadMessagesInfo,
    logout
}

export default userHelpers
