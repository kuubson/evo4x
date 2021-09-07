import React, { useState } from 'react'
import styled from 'styled-components/macro'

import RegistrationModal from 'components/Guest/Modals/RegistrationModal/RegistrationModal'

import Logo from 'assets/images/Logo.png'

import Dashboard from './styled/Dashboard'

const HomeContainer = styled.section`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    &::before {
        content: '';
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.primaryColor};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        clip-path: polygon(0 95%, 100% 80%, 100% 100%, 0% 100%);
    }
`

const Home = () => {
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const toggleRegistrationModal = () =>
        setShowRegistrationModal(showRegistrationModal => !showRegistrationModal)
    return (
        <HomeContainer>
            <RegistrationModal
                showRegistrationModal={showRegistrationModal}
                onClose={toggleRegistrationModal}
            />
            <Dashboard.Navbar>
                <Dashboard.Brand>evo4x</Dashboard.Brand>
                <Dashboard.Links>
                    <Dashboard.Link>Indicators</Dashboard.Link>
                    <Dashboard.Link>Login</Dashboard.Link>
                </Dashboard.Links>
            </Dashboard.Navbar>
            <Dashboard.Advantages>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Straightforward trading message - keep it simple.
                </Dashboard.Advantage>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Profitable either poor analysis? We don't care - trust the process!
                </Dashboard.Advantage>
                <Dashboard.Advantage>
                    <Dashboard.Dollar>$</Dashboard.Dollar>
                    Remember - it's a mental battle, not technical one.
                </Dashboard.Advantage>
                <Dashboard.Button onClick={toggleRegistrationModal} fill={showRegistrationModal}>
                    join evo4x's community
                </Dashboard.Button>
            </Dashboard.Advantages>
            <Dashboard.Header>
                <Dashboard.Logo src={Logo} alt="evo4x" />
            </Dashboard.Header>
        </HomeContainer>
    )
}

export default Home
