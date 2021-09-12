import React, { useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

const RegistrationModalContainer = styled(sharedStyled.BlackLayer)``

const RegistrationModal = ({ showModal, toggleModal }) => {
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
    const register = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                const url = '/api/user/register'
                await utils.axios.post(url, {
                    name,
                    email,
                    password,
                    repeatedPassword
                })
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    const formCompleted = name && email && password && repeatedPassword
    return (
        <RegistrationModalContainer showLayer={showModal}>
            <Dashboard.Content showModal={showModal}>
                <Dashboard.CloseButton onClick={toggleModal}>✕</Dashboard.CloseButton>
                <Dashboard.Header scaleOut={formCompleted}>
                    {`"You either win or learn - 
                    not win or lose"`}
                </Dashboard.Header>
                <Dashboard.Form onSubmit={register} noValidate>
                    <Composed.Input
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        value={name}
                        placeholder="Type your name"
                        error={nameError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationEmail"
                        name="email"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationPassword"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Composed.Input
                        id="registrationRepeatedPassword"
                        name="repeatedPassword"
                        type="password"
                        label="Password again"
                        value={repeatedPassword}
                        placeholder="Type your password again"
                        error={repeatedPasswordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Dashboard.Submit scaleIn={formCompleted}>Join evo4x</Dashboard.Submit>
                    <ApiFeedback />
                </Dashboard.Form>
            </Dashboard.Content>
        </RegistrationModalContainer>
    )
}

export default RegistrationModal
