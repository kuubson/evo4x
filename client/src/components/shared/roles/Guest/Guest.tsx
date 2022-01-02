import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import { useRole } from 'hooks'

import { history } from 'utils'

const GuestContainer = styled.section`
    height: 100%;
`

export const Guest: React.FC = ({ children }) => {
    const { role } = useRole()
    useEffect(() => {
        if (role === 'admin') {
            history.push('/admin/profile')
        }
        if (role === 'user') {
            history.push('/user/profile')
        }
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}
