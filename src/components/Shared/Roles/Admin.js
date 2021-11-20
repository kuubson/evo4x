import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import utils from 'utils'

const AdminContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

const Admin = ({ children }) => {
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
    const logout = async () => {
        const url = '/api/global/logout'
        const response = await utils.axios.get(url)
        if (response) {
            socket.disconnect()
            setSocket(undefined)
            utils.setRole('guest')
            utils.history.push('/')
        }
    }
    return role === 'admin' ? (
        <AdminContainer>
            <Navbar
                hamburger
                links={[
                    {
                        link: 'Analysis',
                        pathname: '/admin/analysis'
                    },
                    {
                        link: 'Logout',
                        onClick: logout
                    }
                ]}
            />
            {children}
        </AdminContainer>
    ) : null
}

export default Admin
