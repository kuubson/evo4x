import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import userHooks from './hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import userHelpers from './helpers'

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

const User: React.FC<IUser> = ({ children, chat }) => {
    const { unreadMessagesAmount } = hooks.useMessages()
    const { currentUser } = userHooks.useCurrentUser()
    const { socket, setSocket } = userHooks.useSocket(chat, currentUser)
    const { role } = hooks.useRole()
    useEffect(() => {
        userHelpers.checkRole(role)
    }, [])
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
                        onClick: () => userHelpers.logout(socket, setSocket)
                    }
                ]}
                hamburger
            />
            {children}
        </UserContainer>
    ) : null
}

export default User
