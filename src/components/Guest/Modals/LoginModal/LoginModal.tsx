import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import loginModalHelpers from './helpers'

const LoginModalContainer = styled(sharedStyled.BlackLayer)``

interface ILoginModal {
    showModal: boolean
    toggleModal: () => void
    role: Role
    setRole: React.Dispatch<React.SetStateAction<Role>>
}

const LoginModal: React.FC<ILoginModal> = ({ showModal, toggleModal, role, setRole }) => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const { email, emailError, password, passwordError } = form
    const formHandler = hooks.useFormHandler(setForm)
    return (
        <LoginModalContainer showLayer={showModal}>
            <RegistrationModalDashboard.Content showModal={showModal}>
                <RegistrationModalDashboard.CloseButton
                    onClick={() =>
                        loginModalHelpers.closeModal({
                            setRole,
                            toggleModal
                        })
                    }
                >
                    ✕
                </RegistrationModalDashboard.CloseButton>
                <RegistrationModalDashboard.Header>
                    "Get rich or die trying"
                </RegistrationModalDashboard.Header>
                <RegistrationModalDashboard.Form
                    onSubmit={event =>
                        loginModalHelpers.login({
                            event,
                            role,
                            form,
                            setForm,
                            formHandler
                        })
                    }
                    noValidate
                >
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
