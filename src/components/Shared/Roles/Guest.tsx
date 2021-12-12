import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import utils from 'utils'

const GuestContainer = styled.section`
    height: 100%;
`

const Guest: React.FC = ({ children }) => {
    const { role } = hooks.useRole()
    useEffect(() => {
        if (role === 'user') {
            utils.history.push('/user/profile')
        }
    }, [])
    return <GuestContainer>{children}</GuestContainer>
}

export default Guest
