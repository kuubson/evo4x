import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Navbar from 'components/Shared/Navbar/Navbar'

import RegistrationModal from 'components/Guest/Modals/RegistrationModal/RegistrationModal'
import LoginModal from 'components/Guest/Modals/LoginModal/LoginModal'

import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

import Logo from 'assets/images/Logo.png'

const HomeContainer = styled.section`
    min-height: 100%;
    padding: 85px 0px;
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
        @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
            clip-path: polygon(0 95%, 100% 85%, 100% 100%, 0% 100%);
        }
        @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
            clip-path: polygon(0 95%, 100% 88%, 100% 100%, 0% 100%);
        }
    }
`

const Home = () => {
    const { token } = hooks.useQueryParams()
    useEffect(() => {
        const authenticateEmail = async () => {
            try {
                handleToggler(setShowLoginModal)
                const url = '/api/user/authenticateEmail'
                await utils.axios.post(url, {
                    token
                })
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        if (token) {
            authenticateEmail()
        }
    }, [token])
    const [showHelpSidebar, setShowHelpSidebar] = useState(false)
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const handleToggler = dispatcher =>
        dispatcher(state => {
            if (state) {
                setTimeout(() => utils.setApiFeedback(''), 600)
            }
            return !state
        })
    return (
        <HomeContainer>
            <Composed.HelpSidebar
                showSidebar={showHelpSidebar}
                toggleSidebar={() => handleToggler(setShowHelpSidebar)}
                hideSidebar={() => setShowHelpSidebar(false)}
                showLoginModal={() => setShowLoginModal(true)}
            />
            <RegistrationModal
                showModal={showRegistrationModal}
                toggleModal={() => handleToggler(setShowRegistrationModal)}
            />
            <LoginModal
                showModal={showLoginModal}
                toggleModal={() => handleToggler(setShowLoginModal)}
            />
            <Navbar
                links={[
                    {
                        link: 'Indicators'
                    },
                    {
                        link: 'Login',
                        onClick: () => handleToggler(setShowLoginModal)
                    },
                    {
                        link: 'Help',
                        onClick: () => handleToggler(setShowHelpSidebar)
                    }
                ]}
            />
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
                <Dashboard.Logo src={Logo} alt="evo4x" mobile />
                <Dashboard.Button
                    onClick={() => handleToggler(setShowRegistrationModal)}
                    $fill={showRegistrationModal}
                >
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
