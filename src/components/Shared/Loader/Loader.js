import React from 'react'
import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

import Logo from 'assets/images/Logo.png'

import Dashboard from './styled/Dashboard'

const LoaderContainer = styled.section`
    width: 100%;
    height: 100%;
    transition: background ease-in-out 0.3s;
    position: fixed;
    z-index: 2;
    pointer-events: none;
    ${({ $loading }) =>
        $loading &&
        css`
            background: rgba(0, 0, 0, 0.1);
            pointer-events: auto;
        `}
`

const Loader = () => {
    const { loading } = hooks.useLoader()
    return (
        <LoaderContainer $loading={loading}>
            <Dashboard.Logo src={Logo} $loading={loading} />
        </LoaderContainer>
    )
}

export default Loader
