const initialState = {
    lastUnreadMessageIndex: undefined,
    unreadMessagesAmount: 0
}

const messages = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'setLastUnreadMessageIndex':
            return {
                ...state,
                lastUnreadMessageIndex: payload
            }
        case 'setUnreadMessagesAmount':
            return {
                ...state,
                unreadMessagesAmount: payload
            }
        default:
            return state
    }
}

export default messages
