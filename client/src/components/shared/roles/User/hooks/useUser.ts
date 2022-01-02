import { useState, useEffect } from 'react'

import { useSocket, useMessagesInfo } from 'hooks'

import { logout } from 'helpers'

import { axios } from 'utils'

type Response = {
    user: User
    lastUnreadMessageIndex: number
    unreadMessagesAmount: number
}

export const useUser = (chat: boolean | undefined) => {
    const { socket, clearSocket } = useSocket()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = useMessagesInfo()
    const [currentUser, setCurrentUser] = useState<User>()
    useEffect(() => {
        const getUnreadMessagesInfo = async () => {
            const url = '/api/user/communication/getUnreadMessagesInfo'
            const response = await axios.get<Response>(url)
            if (response) {
                const { user, lastUnreadMessageIndex, unreadMessagesAmount } = response.data
                setCurrentUser(user)
                setLastUnreadMessageIndex(lastUnreadMessageIndex)
                setUnreadMessagesAmount(unreadMessagesAmount)
            }
        }
        getUnreadMessagesInfo()
    }, [])
    useEffect(() => {
        const handleOnSendMessage = (message: Message) => {
            const withoutChatAndCurrentUser = !chat && message.user.id !== currentUser!.id
            if (withoutChatAndCurrentUser) {
                setUnreadMessagesAmount(unreadMessagesAmount + 1)
                if (!lastUnreadMessageIndex) {
                    setLastUnreadMessageIndex(1)
                } else {
                    setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
                }
            }
        }
        if (socket) {
            socket.on('sendMessage', handleOnSendMessage)
        }
        return () => {
            if (socket) {
                socket.off('sendMessage', handleOnSendMessage)
            }
        }
    }, [socket, currentUser, unreadMessagesAmount])
    const links = [
        {
            link: 'Profile',
            pathname: '/user/profile'
        },
        {
            link: 'Analysis',
            pathname: '/user/analysis'
        },
        {
            link: 'Chat',
            pathname: '/user/chat',
            counter: unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99
        },
        {
            link: 'Sessions',
            pathname: '/user/sessions'
        },
        {
            link: 'Events',
            pathname: '/user/events'
        },
        {
            link: 'Indicators',
            pathname: '/user/indicators'
        },
        {
            link: 'Mottos',
            pathname: '/user/mottos'
        },
        {
            link: 'Aha-moments',
            pathname: '/user/aha-moments'
        },
        {
            link: 'Mentors',
            pathname: '/user/mentors'
        },
        {
            link: 'Logout',
            onClick: () => logout(clearSocket)
        }
    ]
    return {
        links
    }
}
