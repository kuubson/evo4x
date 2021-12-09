import { useAppDispatch, useAppSelector } from 'redux/hooks'

const useMessages = () => {
    const dispatch = useAppDispatch()
    const { lastUnreadMessageIndex, unreadMessagesAmount } = useAppSelector(state => state.messages)
    const setLastUnreadMessageIndex = (payload: number) =>
        dispatch({ type: 'setLastUnreadMessageIndex', payload })
    const setUnreadMessagesAmount = (payload: number) =>
        dispatch({ type: 'setUnreadMessagesAmount', payload })
    return {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }
}

export default useMessages
