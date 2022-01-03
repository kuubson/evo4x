import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import Navbar from 'components/shared/Navbar/Navbar'

import { useSocket, useRole } from 'hooks'
import { useUser } from './hooks'

import { history } from 'utils'

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

export const User: React.FC<IUser> = ({ children, chat }) => {
    const { socket, setSocket } = useSocket()
    const { role } = useRole()
    const { links } = useUser(chat)
    useEffect(() => {
        if (!socket) {
            setSocket(io('/user'))
        }
        if (role !== 'user') {
            history.push('/?failedAuthentication=true')
        }
    }, [])
    return role === 'user' ? (
        <UserContainer>
            <Navbar links={links} hamburger />
            {children}
        </UserContainer>
    ) : null
}
