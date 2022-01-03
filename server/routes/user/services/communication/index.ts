import * as subscribePushNotifications from './subscribePushNotifications'
import * as getMessages from './getMessages'
import * as sendMessage from './sendMessage'
import * as sendFile from './sendFile'
import * as getUnreadMessagesInfo from './getUnreadMessagesInfo'
import * as getAnalysis from './getAnalysis'

const communication = {
    subscribePushNotifications,
    getMessages,
    sendMessage,
    sendFile,
    getUnreadMessagesInfo,
    getAnalysis
}

export default communication
