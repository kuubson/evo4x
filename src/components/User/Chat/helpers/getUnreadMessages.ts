import utils from 'utils'

type UnreadMessagesGetter = {
    messagesRef: React.RefObject<HTMLDivElement>
    lastUnreadMessageIndex: number | undefined
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    setUnreadMessagesAmount: any
}

type Response = {
    messages: Message[]
}

const getUnreadMessages = async ({
    messagesRef,
    lastUnreadMessageIndex,
    setMessages,
    setUnreadMessagesAmount
}: UnreadMessagesGetter) => {
    const url = '/api/user/communication/getMessages'
    const response = await utils.axios.post<Response>(url, {
        limit: lastUnreadMessageIndex,
        offset: 0
    })
    if (response) {
        const { messages } = response.data
        setMessages(messages)
        setTimeout(() => {
            messagesRef.current!.scrollTop = 0
        }, 0)
        setUnreadMessagesAmount(0)
    }
}

export default getUnreadMessages
