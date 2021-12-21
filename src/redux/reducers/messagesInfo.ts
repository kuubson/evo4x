import actions from 'redux/actions'

type State = {
    lastUnreadMessageIndex: number | undefined
    unreadMessagesAmount: number
}

const initialState: State = {
    lastUnreadMessageIndex: undefined,
    unreadMessagesAmount: 0
}

type LastUnreadMessageIndexAction = {
    payload: number
    type: 'SET_LAST_UNREAD_MESSAGE_INDEX'
}

type UnreadMessagesAmountAction = {
    payload: number
    type: 'SET_UNREAD_MESSAGES_AMOUNT'
}

type Action = LastUnreadMessageIndexAction | UnreadMessagesAmountAction

const messagesInfo = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.SET_LAST_UNREAD_MESSAGE_INDEX:
            return {
                ...state,
                lastUnreadMessageIndex: payload
            }
        case actions.SET_UNREAD_MESSAGES_AMOUNT:
            return {
                ...state,
                unreadMessagesAmount: payload
            }
        default:
            return state
    }
}

export default messagesInfo
