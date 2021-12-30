import React from 'react'
import styled from 'styled-components/macro'

import registrationModalHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

const RegistrationModalContainer = styled(sharedStyled.BlackLayer)``

interface IRegistrationModal {
    showModal: boolean
    toggleModal: () => void
}

const RegistrationModal: React.FC<IRegistrationModal> = ({ showModal, toggleModal }) => {
    const {
        form: {
            name,
            nameError,
            email,
            emailError,
            password,
            passwordError,
            repeatedPassword,
            repeatedPasswordError
        },
        formHandler,
        register
    } = registrationModalHooks.useForm()
    const formCompleted = !!name && !!email && !!password && !!repeatedPassword
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
