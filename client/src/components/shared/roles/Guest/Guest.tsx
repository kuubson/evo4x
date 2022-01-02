import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import { useSocket, useRole } from 'hooks'

import { logout } from 'helpers'

import { history } from 'utils'

const GuestContainer = styled.section`
    height: 100%;
`

export const Guest: React.FC = ({ children }) => {
    const { closeSocketConnection } = useSocket()
    const { role } = useRole()
    useEffect(() => {
        switch (true) {
            case role === 'admin':
                history.push('/admin/profile')
                break
            case role === 'user':
                history.push('/user/profile')
                break
            default:
                logout(closeSocketConnection)
                break
        }
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}
