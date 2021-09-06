import React from 'react'
import styled from 'styled-components/macro'

import Dashboard from './styled/Dashboard'

const HomeContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    &::before {
        content: '';
        width: 100%;
        background: #ffff00;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        clip-path: polygon(100% 80%, 0 100%, 100% 100%);
    }
`

const Home = () => {
    return (
        <HomeContainer>
            <Dashboard.Advantages>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Profitable either poor analysis? We don't care. Trust the process!
                </Dashboard.Advantage>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Straightforward trading message - keep it simple.
                </Dashboard.Advantage>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Remember! It's a mental battle, not technical one.
                </Dashboard.Advantage>
            </Dashboard.Advantages>
            <Dashboard.Header>
                <Dashboard.Logo>Evo4x</Dashboard.Logo>
                <Dashboard.Button>Join our community</Dashboard.Button>
            </Dashboard.Header>
        </HomeContainer>
    )
}

export default Home
