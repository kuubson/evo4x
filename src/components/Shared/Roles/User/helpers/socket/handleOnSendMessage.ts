type OnSendMessageHandler = {
    chat: boolean | undefined
    currentUser: User | undefined
    lastUnreadMessageIndex: number | undefined
    unreadMessagesAmount: number
    setLastUnreadMessageIndex: any
    setUnreadMessagesAmount: any
}

const handleOnSendMessage = (
    message: Message,
    {
        chat,
        currentUser,
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }: OnSendMessageHandler
) => {
    const withoutChatAndCurrentUser = !chat && message.user.id !== currentUser!.id
    if (withoutChatAndCurrentUser) {
        setUnreadMessagesAmount(unreadMessagesAmount + 1)
        !lastUnreadMessageIndex
            ? setLastUnreadMessageIndex(1)
            : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
    }
}

export default handleOnSendMessage
