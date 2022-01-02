import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import * as hooks from 'hooks'

import { logout } from 'helpers'

import { history } from 'utils'

const GuestContainer = styled.section`
    height: 100%;
`

export const Guest: React.FC = ({ children }) => {
    const { closeSocketConnection } = hooks.useSocket()
    const { role } = hooks.useRole()
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
