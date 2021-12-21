import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import io from 'socket.io-client'

import hooks from 'hooks'
import adminHooks from './hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import userHelpers from 'components/Shared/Roles/User/helpers'
import adminHelpers from './helpers'

const AdminContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

const Admin: React.FC = ({ children }) => {
    const { clearSocket } = adminHooks.useSocket()
    const { role } = hooks.useRole()
    useEffect(() => {
        adminHelpers.checkRole(role)
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
                        onClick: () => userHelpers.logout(clearSocket)
                    }
                ]}
                hamburger
            />
            {children}
        </AdminContainer>
    ) : null
}

export default Admin
