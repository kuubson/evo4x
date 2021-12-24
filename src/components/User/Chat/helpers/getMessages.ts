import utils from 'utils'

import chatHelpers from '.'

type MessagesGetter = MessagesOrAnalysisGetterProps & {
    messagesRef: React.RefObject<HTMLDivElement>
    hasMoreMessages: boolean
    lastUnreadMessageIndex: number | undefined
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    setHasMoreMessages: DispatchBoolean
    setIsLoading: DispatchBoolean
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
    setUnreadMessagesAmount: any
}

type Response = {
    user: User
    messages: Message[]
}

const getMessages = async ({
    event,
    limit,
    offset,
    messagesRef,
    hasMoreMessages,
    lastUnreadMessageIndex,
    setMessages,
    setHasMoreMessages,
    setIsLoading,
    setCurrentUser,
    setUnreadMessagesAmount
}: MessagesGetter) => {
    const loadCachedMessage = () => {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!)
        const savedMessages = JSON.parse(sessionStorage.getItem('messages')!)
        if (savedMessages && !!savedMessages.length) {
            setIsLoading(false)
            setCurrentUser(currentUser)
            setMessages(savedMessages)
            setTimeout(() => chatHelpers.pushToTheBottom(messagesRef, true), 0)
        }
    }
    const url = '/api/user/communication/getMessages'
    if (event) {
        const target = event.target as any
        if (target.scrollTop <= 0 && hasMoreMessages) {
            const response = await utils.axios.post<Response>(url, {
                limit,
                offset
            })
            if (response) {
                const { messages } = response.data
                setHasMoreMessages(messages.length !== 0)
                const lastScroll = target.scrollHeight
                setMessages(_messages => [...messages, ..._messages])
                target.scrollTop = target.scrollHeight - lastScroll
                if (messages.length + messages.length >= lastUnreadMessageIndex!) {
                    setUnreadMessagesAmount(0)
                }
            }
        }
    }
    if (!event) {
        loadCachedMessage()
        const response = await utils.axios.post<Response>(url, {
            limit,
            offset
        })
        if (response) {
            setIsLoading(false)
            const { user, messages } = response.data
            sessionStorage.setItem('currentUser', JSON.stringify(user))
            sessionStorage.setItem('messages', JSON.stringify(messages))
            setCurrentUser(user)
            setMessages(messages)
            chatHelpers.pushToTheBottom(messagesRef, true)
            if (messages.length >= lastUnreadMessageIndex!) {
                setUnreadMessagesAmount(0)
            }
        }
    }
}

export default getMessages
