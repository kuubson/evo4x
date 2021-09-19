import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import utils from 'utils'

const UserContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

const User = ({ children, chat }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    const [currentUser, setCurrentUser] = useState({})
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
            const url = '/api/user/getUnreadMessagesInfo'
            const response = await utils.axios.get(url)
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
        const handleOnSendMessage = ({ user }) => {
            if (!chat && user.id !== currentUser.id) {
                setUnreadMessagesAmount(unreadMessagesAmount + 1)
                !lastUnreadMessageIndex
                    ? setLastUnreadMessageIndex(1)
                    : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
            }
        }
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket, currentUser, unreadMessagesAmount])
    const logout = async () => {
        const url = '/api/global/logout'
        const response = await utils.axios.get(url)
        if (response) {
            utils.setRole('guest')
            utils.history.push('/')
        }
    }
    return role === 'user' ? (
        <UserContainer>
            <Navbar
                hamburger
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
                        onClick: logout
                    }
                ]}
            />
            {children}
        </UserContainer>
    ) : null
}

export default User
