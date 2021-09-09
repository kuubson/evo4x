import React from 'react'
import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

import Logo from 'assets/images/Logo.png'

import Dashboard from './styled/Dashboard'

import { BlackLayer } from 'components/Shared/BlackLayer/BlackLayer'

const LoaderContainer = styled(BlackLayer)`
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
