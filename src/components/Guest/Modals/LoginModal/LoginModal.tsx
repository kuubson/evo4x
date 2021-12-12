import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

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
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: ''
        }))
        if (!formHandler.validateEmail(email)) validated = false
        if (!formHandler.validatePassword(password, '', true)) validated = false
        return validated
    }
    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = `/api/${role}/auth/login`
                const response = await utils.axios.post(url, {
                    email,
                    password
                })
                if (response) {
                    utils.setRole(role)
                    utils.history.push(role === 'admin' ? '/admin/analysis' : '/user/profile')
                }
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    return (
        <LoginModalContainer showLayer={showModal}>
            <RegistrationModalDashboard.Content showModal={showModal}>
                <RegistrationModalDashboard.CloseButton
                    onClick={() => {
                        setRole('user')
                        toggleModal()
                    }}
                >
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
