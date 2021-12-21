import utils from 'utils'

type Response = {
    user: User
    lastUnreadMessageIndex: number
    unreadMessagesAmount: number
}

const getUnreadMessagesInfo = async () => {
    const url = '/api/user/communication/getUnreadMessagesInfo'
    const response = await utils.axios.get<Response>(url)
    return response.data
}

export default getUnreadMessagesInfo
