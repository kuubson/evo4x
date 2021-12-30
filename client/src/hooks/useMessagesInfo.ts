import { useAppDispatch, useAppSelector } from 'redux/hooks'

import actions from 'redux/actions'

const useMessagesInfo = () => {
    const dispatch = useAppDispatch()
    const { lastUnreadMessageIndex, unreadMessagesAmount } = useAppSelector(
        state => state.messagesInfo
    )
    const setLastUnreadMessageIndex = (payload: number) =>
        dispatch({ type: actions.SET_LAST_UNREAD_MESSAGE_INDEX, payload })
    const setUnreadMessagesAmount = (payload: number) =>
        dispatch({ type: actions.SET_UNREAD_MESSAGES_AMOUNT, payload })
    return {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }
}

export default useMessagesInfo
