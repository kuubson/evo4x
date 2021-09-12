import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useParams } from 'react-router-dom'

import Logo from 'assets/images/Logo.png'

import RegistrationModal from 'components/Guest/Modals/RegistrationModal/RegistrationModal'
import LoginModal from 'components/Guest/Modals/LoginModal/LoginModal'

import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

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
        @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
            clip-path: polygon(0 95%, 100% 85%, 100% 100%, 0% 100%);
        }
        @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
            clip-path: polygon(0 95%, 100% 88%, 100% 100%, 0% 100%);
        }
    }
`

const Home = () => {
    const { token } = useParams()
    useEffect(() => {
        const authenticateEmail = async () => {
            handleToggler(setShowLoginModal)
            try {
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
            <Dashboard.Navbar>
                <Dashboard.Brand>evo4x</Dashboard.Brand>
                <Dashboard.Links>
                    <Dashboard.Link>Indicators</Dashboard.Link>
                    <Dashboard.Link onClick={() => handleToggler(setShowLoginModal)}>
                        Login
                    </Dashboard.Link>
                    <Dashboard.Link onClick={() => handleToggler(setShowHelpSidebar)}>
                        Help
                    </Dashboard.Link>
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
