import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import { RegistrationModalContainer } from 'components/Guest/Modals/RegistrationModal/RegistrationModal'

import RMDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RMComposed from 'components/Guest/Modals/RegistrationModal/composed'

const LoginModalContainer = styled(RegistrationModalContainer)``

const LoginModal = ({ showModal, onClose }) => {
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    })
    const { email, emailError, password, passwordError } = form
    const formHandler = hooks.useFormHandler(setForm)
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        if (!formHandler.validateEmail(email)) validated = false
        if (!formHandler.validatePassword(password, undefined, true)) validated = false
        return validated
    }
    const login = e => {
        e.preventDefault()
        if (validate()) {
            alert('Logged')
        }
    }
    return (
        <LoginModalContainer showModal={showModal}>
            <RMDashboard.Content showModal={showModal}>
                <RMDashboard.CloseButton onClick={onClose}>✕</RMDashboard.CloseButton>
                <RMDashboard.Header>"Get rich or die trying"</RMDashboard.Header>
                <RMDashboard.Form onSubmit={login} noValidate>
                    <RMComposed.Input
                        id="loginEmail"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RMComposed.Input
                        id="loginPassword"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RMDashboard.Submit scaleIn>Login</RMDashboard.Submit>
                </RMDashboard.Form>
            </RMDashboard.Content>
        </LoginModalContainer>
    )
}

export default LoginModal
