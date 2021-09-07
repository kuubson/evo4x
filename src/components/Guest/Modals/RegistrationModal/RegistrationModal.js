import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

import Dashboard from './styled/Dashboard'

import Composed from './composed'

export const RegistrationModalContainer = styled.section`
    width: 100%;
    height: 100%;
    transition: background ease-in-out 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    pointer-events: none;
    ${({ showModal }) =>
        showModal &&
        css`
            background: rgba(0, 0, 0, 0.5);
            pointer-events: auto;
        `}
`

const RegistrationModal = ({ showModal, onClose }) => {
    const [form, setForm] = useState({
        name: '',
        nameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const {
        name,
        nameError,
        email,
        emailError,
        password,
        passwordError,
        repeatedPassword,
        repeatedPasswordError
    } = form
    const formHandler = hooks.useFormHandler(setForm)
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            nameError: '',
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        if (!formHandler.validateProperty('name', name)) validated = false
        if (!formHandler.validateEmail(email)) validated = false
        if (!formHandler.validatePassword(password)) validated = false
        if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
        return validated
    }
    const register = e => {
        e.preventDefault()
        if (validate()) {
            alert('Registered')
        }
    }
    const formCompleted = name && email && password && repeatedPassword
    return (
        <RegistrationModalContainer showModal={showModal}>
            <Dashboard.Content showModal={showModal}>
                <Dashboard.CloseButton onClick={onClose}>✕</Dashboard.CloseButton>
                <Dashboard.Header scaleOut={formCompleted}>
                    {`"You either win or learn - 
                    not win or lose"`}
                </Dashboard.Header>
                <Dashboard.Form onSubmit={register} noValidate>
                    <Composed.Input
                        id="name"
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Type your name"
                        error={nameError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationEmail"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationPassword"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationRepeatedPassword"
                        type="password"
                        label="Password again"
                        value={repeatedPassword}
                        placeholder="Type your password again"
                        error={repeatedPasswordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Dashboard.Submit scaleIn={formCompleted}>Join evo4x</Dashboard.Submit>
                </Dashboard.Form>
            </Dashboard.Content>
        </RegistrationModalContainer>
    )
}

export default RegistrationModal
