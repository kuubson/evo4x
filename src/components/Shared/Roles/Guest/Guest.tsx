import React from 'react'
import styled from 'styled-components/macro'

import guestHooks from './hooks'

const GuestContainer = styled.section`
    height: 100%;
`

const Guest: React.FC = ({ children }) => {
    guestHooks.useHelpers()
    return <GuestContainer>{children}</GuestContainer>
}

export default Guest
