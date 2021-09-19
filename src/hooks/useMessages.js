import { useDispatch, useSelector } from 'react-redux'

const useMessages = () => {
    const dispatch = useDispatch()
    const { lastUnreadMessageIndex, unreadMessagesAmount } = useSelector(state => state.messages)
    const setLastUnreadMessageIndex = payload =>
        dispatch({ type: 'setLastUnreadMessageIndex', payload })
    const setUnreadMessagesAmount = payload =>
        dispatch({ type: 'setUnreadMessagesAmount', payload })
    return {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    }
}

export default useMessages
