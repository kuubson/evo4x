import React from 'react'
import styled from 'styled-components/macro'

import loginModalHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

const LoginModalContainer = styled(sharedStyled.BlackLayer)``

interface ILoginModal {
    role: Role
    setRole: React.Dispatch<React.SetStateAction<Role>>
    showModal: boolean
    toggleModal: () => void
}

const LoginModal: React.FC<ILoginModal> = ({ role, setRole, showModal, toggleModal }) => {
    const {
        form: { email, emailError, password, passwordError },
        formHandler,
        login
    } = loginModalHooks.useForm({
        role
    })
    const closeModal = () => {
        setRole('user')
        toggleModal()
    }
    return (
        <LoginModalContainer showLayer={showModal}>
            <RegistrationModalDashboard.Content showModal={showModal}>
                <RegistrationModalDashboard.CloseButton onClick={closeModal}>
                    ✕
                </RegistrationModalDashboard.CloseButton>
                <RegistrationModalDashboard.Header>
                    "Get rich or die trying"
                </RegistrationModalDashboard.Header>
                <RegistrationModalDashboard.Form onSubmit={login} noValidate>
                    <RegistrationModalComposed.Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RegistrationModalComposed.Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RegistrationModalDashboard.Submit>Login</RegistrationModalDashboard.Submit>
                    <ApiFeedback />
                </RegistrationModalDashboard.Form>
            </RegistrationModalDashboard.Content>
        </LoginModalContainer>
    )
}

export default LoginModal
