import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import userHooks from './hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import userUtils from './utils'

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
    const { clearSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    const { unreadMessagesAmount } = hooks.useMessagesInfo()
    userHooks.useHelpers(chat)
    return role === 'user' ? (
        <UserContainer>
            <Navbar links={userUtils.links(unreadMessagesAmount, clearSocket)} hamburger />
            {children}
        </UserContainer>
    ) : null
}

export default User
