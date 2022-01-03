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
        switch (true) {
            case role === 'admin':
                history.push('/admin/profile')
                break
            case role === 'user':
                history.push('/user/profile')
                break
        }
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}
