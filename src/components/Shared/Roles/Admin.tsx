import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import utils from 'utils'

import { logout } from './utils'

const AdminContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

const Admin: React.FC = ({ children }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { role } = hooks.useRole()
    useEffect(() => {
        if (role !== 'admin') {
            utils.history.push('/')
        }
        if (!socket) {
            setSocket(io('/admin'))
        }
    }, [])
    return role === 'admin' ? (
        <AdminContainer>
            <Navbar
                links={[
                    {
                        link: 'Analysis',
                        pathname: '/admin/analysis'
                    },
                    {
                        link: 'Logout',
                        onClick: () => logout(socket, setSocket)
                    }
                ]}
                hamburger
            />
            {children}
        </AdminContainer>
    ) : null
}

export default Admin
