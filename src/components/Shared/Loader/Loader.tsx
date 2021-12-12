import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import sharedStyled from 'components/Shared/styled'
import Dashboard from './styled/Dashboard'

import Logo from 'assets/images/Logo.png'

const LoaderContainer = styled(sharedStyled.BlackLayer)`
    position: fixed;
    z-index: 4;
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
