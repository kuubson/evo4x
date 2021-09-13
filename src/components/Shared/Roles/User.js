import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import utils from 'utils'

const UserContainer = styled.section`
    height: 100%;
`

const User = ({ children }) => {
    const { role } = hooks.useRole()
    useEffect(() => {
        if (role !== 'user') {
            utils.history.push('/?failedAuthentication=true')
        }
    }, [])
    return role === 'user' ? <UserContainer>{children}</UserContainer> : null
}

export default User
