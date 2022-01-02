import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import Navbar from 'components/shared/Navbar/Navbar'

import HelpSidebar from './modules/HelpSidebar/HelpSidebar'
import RegistrationModal from './modules/RegistrationModal/RegistrationModal'
import LoginModal from './modules/LoginModal/LoginModal'

import * as Dashboard from './styled/Dashboard'

import { useQueryParams } from 'hooks'

import { authenticateEmail } from './helpers'

import { links } from './utils'

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
    const { emailToken } = useQueryParams()
    const [role, setRole] = useState<Role>('user')
    const [showHelpSidebar, setShowHelpSidebar] = useState(false)
    const [showRegistrationModal, setShowRegistrationModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    useEffect(() => {
        authenticateEmail({
            emailToken,
            setShowLoginModal
        })
    }, [emailToken])
    const handleToggler = (dispatcher: ReactDispatch<boolean>) => dispatcher(state => !state)
    const showLoginModalForAdmin = () => {
        setRole('admin')
        setShowLoginModal(true)
    }
    return (
        <HomeContainer>
            <HelpSidebar
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
                role={role}
                setRole={setRole}
                showModal={showLoginModal}
                toggleModal={() => handleToggler(setShowLoginModal)}
            />
            <Navbar
                links={links({
                    handleToggler,
                    setShowLoginModal,
                    setShowHelpSidebar
                })}
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
            <Dashboard.HiddenButton onDoubleClick={showLoginModalForAdmin} />
        </HomeContainer>
    )
}

export default Home