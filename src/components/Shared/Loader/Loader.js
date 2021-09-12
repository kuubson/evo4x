import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Logo from 'assets/images/Logo.png'

import sharedStyled from 'components/Shared/styled'
import Dashboard from './styled/Dashboard'

const LoaderContainer = styled(sharedStyled.BlackLayer)`
    position: fixed;
    z-index: 2;
`

const Loader = () => {
    const { loading } = hooks.useLoader()
    return (
        <LoaderContainer showLayer={loading}>
            <Dashboard.Logo src={Logo} $loading={loading} />
        </LoaderContainer>
    )
}

export default Loader
