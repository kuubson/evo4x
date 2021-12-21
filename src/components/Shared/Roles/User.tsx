import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import utils from 'utils'

import { logout } from './utils'

const UserContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

interface IUser {
    chat?: boolean
}

type Response = {
    user: User
    lastUnreadMessageIndex: number
    unreadMessagesAmount: number
}

const User: React.FC<IUser> = ({ children, chat }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    const [currentUser, setCurrentUser] = useState<User>()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = hooks.useMessages()
    useEffect(() => {
        if (role !== 'user') {
            utils.history.push('/?failedAuthentication=true')
        }
        if (!socket) {
            setSocket(io('/user'))
        }
        const getUnreadMessagesInfo = async () => {
            const url = '/api/user/communication/getUnreadMessagesInfo'
            const response = await utils.axios.get<Response>(url)
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
        const handleOnSendMessage = ({ user }: Message) => {
            if (!chat && user.id !== currentUser!.id) {
                setUnreadMessagesAmount(unreadMessagesAmount + 1)
                !lastUnreadMessageIndex
                    ? setLastUnreadMessageIndex(1)
                    : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
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
    return role === 'user' ? (
        <UserContainer>
            <Navbar
                links={[
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
                        onClick: () => logout(socket, setSocket)
                    }
                ]}
                hamburger
            />
            {children}
        </UserContainer>
    ) : null
}

export default User
