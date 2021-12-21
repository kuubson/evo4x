import { useEffect, useState } from 'react'

import hooks from 'hooks'

import userHelpers from 'components/Shared/Roles/User/helpers'

const useCurrentUser = () => {
    const { setLastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessagesInfo()
    const [currentUser, setCurrentUser] = useState<User>()
    useEffect(() => {
        const fetchData = async () => {
            const { user, lastUnreadMessageIndex, unreadMessagesAmount } =
                await userHelpers.getUnreadMessagesInfo()
            setCurrentUser(user)
            setLastUnreadMessageIndex(lastUnreadMessageIndex)
            setUnreadMessagesAmount(unreadMessagesAmount)
        }
        fetchData()
    }, [])
    return {
        currentUser
    }
}

export default useCurrentUser
