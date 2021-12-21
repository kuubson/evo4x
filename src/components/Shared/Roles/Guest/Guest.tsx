import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import guestHelpers from './helpers'

const GuestContainer = styled.section`
    height: 100%;
`

const Guest: React.FC = ({ children }) => {
    const { role } = hooks.useRole()
    useEffect(() => {
        guestHelpers.checkRole(role)
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}

export default Guest
