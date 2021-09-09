import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import RMDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RMComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

import { RegistrationModalContainer } from 'components/Guest/Modals/RegistrationModal/RegistrationModal'

const LoginModalContainer = styled(RegistrationModalContainer)``

const LoginModal = ({ showModal, toggleModal }) => {
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
    const login = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/login'
                const response = await utils.axios.post(url, {
                    email,
                    password
                })
                if (response) {
                    utils.redirectTo('/user/profile')
                }
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    return (
        <LoginModalContainer showModal={showModal}>
            <RMDashboard.Content showModal={showModal}>
                <RMDashboard.CloseButton onClick={toggleModal}>✕</RMDashboard.CloseButton>
                <RMDashboard.Header>"Get rich or die trying"</RMDashboard.Header>
                <RMDashboard.Form onSubmit={login} noValidate>
                    <RMComposed.Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RMComposed.Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <RMDashboard.Submit scaleIn>Login</RMDashboard.Submit>
                    <ApiFeedback />
                </RMDashboard.Form>
            </RMDashboard.Content>
        </LoginModalContainer>
    )
}

export default LoginModal
