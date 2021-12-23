import utils from 'utils'

type Response = {
    user: User
    lastUnreadMessageIndex: number
    unreadMessagesAmount: number
}

type UnreadMessagesInfoGetter = {
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
    setLastUnreadMessageIndex: any
    setUnreadMessagesAmount: any
}

const getUnreadMessagesInfo = async ({
    setCurrentUser,
    setLastUnreadMessageIndex,
    setUnreadMessagesAmount
}: UnreadMessagesInfoGetter) => {
    const url = '/api/user/communication/getUnreadMessagesInfo'
    const response = await utils.axios.get<Response>(url)
    if (response) {
        const { user, lastUnreadMessageIndex, unreadMessagesAmount } = response.data
        setCurrentUser(user)
        setLastUnreadMessageIndex(lastUnreadMessageIndex)
        setUnreadMessagesAmount(unreadMessagesAmount)
    }
}

export default getUnreadMessagesInfo
