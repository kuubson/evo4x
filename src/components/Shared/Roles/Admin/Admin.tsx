import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'
import adminHooks from './hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import adminUtils from './utils'

import adminHelpers from './helpers'

const AdminContainer = styled.section`
    height: 100%;
    padding-top: 80px;
    @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
        padding-top: 65px;
    }
`

const Admin: React.FC = ({ children }) => {
    const { role } = hooks.useRole()
    const { clearSocket } = adminHooks.useSocket()
    useEffect(() => {
        adminHelpers.checkRole(role)
    }, [])
    return role === 'admin' ? (
        <AdminContainer>
            <Navbar links={adminUtils.links(clearSocket)} hamburger />
            {children}
        </AdminContainer>
    ) : null
}

export default Admin
