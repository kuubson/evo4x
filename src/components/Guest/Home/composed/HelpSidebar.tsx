import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'
import StyledHelpSidebar from '../styled/HelpSidebar'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

const HelpSidebarContainer = styled(sharedStyled.BlackLayer)``

interface IHelpSidebar {
    showSidebar: boolean
    toggleSidebar: () => void
    hideSidebar: () => void
    showLoginModal: () => void
}

const HelpSidebar: React.FC<IHelpSidebar> = ({
    showSidebar,
    toggleSidebar,
    hideSidebar,
    showLoginModal
}) => {
    const { passwordToken, failedAuthentication } = hooks.useQueryParams()
    useEffect(() => {
        if (passwordToken) {
            setIssue('changePassword')
            toggleSidebar()
        }
        if (failedAuthentication) {
            showLoginModal()
        }
    }, [])
    const [issue, setIssue] = useState('')
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const { email, emailError, password, passwordError, repeatedPassword, repeatedPasswordError } =
        form
    const formHandler = hooks.useFormHandler(setForm)
    const validate = () => {
        let validated = true
        setForm(form => ({
            ...form,
            emailError: '',
            passwordError: '',
            repeatedPasswordError: ''
        }))
        if (issue === 'changePassword') {
            if (!formHandler.validatePassword(password, '', false)) validated = false
            if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
        } else {
            if (!formHandler.validateEmail(email)) validated = false
        }
        return validated
    }
    const handleHelpSidebar = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            try {
                if (issue === 'changePassword') {
                    const url = '/api/user/auth/changePassword'
                    const response = await utils.axios.post(url, {
                        password,
                        repeatedPassword,
                        passwordToken
                    })
                    if (response) {
                        setIssue('')
                        hideSidebar()
                        showLoginModal()
                    }
                } else {
                    const url = `/api/user/auth/${
                        issue === 'password' ? 'requestPasswordChange' : 'resendEmail'
                    }`
                    await utils.axios.post(url, {
                        email
                    })
                }
            } catch (error) {
                utils.handleApiValidation(error, setForm)
            }
        }
    }
    const issues = [
        {
            issue: 'Have not you received any e-mail?',
            active: issue === 'email',
            handleOnClick: () => setIssue('email')
        },
        {
            issue: 'Has the link to authenticate your email address expired?',
            active: issue === 'link',
            handleOnClick: () => setIssue('link')
        },
        {
            issue: 'Did you forget the password?',
            active: issue === 'password',
            handleOnClick: () => setIssue('password')
        }
    ]
    return (
        <HelpSidebarContainer showLayer={showSidebar}>
            <StyledHelpSidebar.Content showSidebar={showSidebar}>
                <RegistrationModalDashboard.CloseButton
                    onClick={() => {
                        setTimeout(() => setIssue(''), 600)
                        toggleSidebar()
                    }}
                >
                    ✕
                </RegistrationModalDashboard.CloseButton>
                {issues.map(({ issue, active, handleOnClick }) => (
                    <StyledHelpSidebar.Issue key={issue} active={active} onClick={handleOnClick}>
                        {issue}
                    </StyledHelpSidebar.Issue>
                ))}
                {issue && (
                    <StyledHelpSidebar.Form onSubmit={handleHelpSidebar} noValidate>
                        {issue === 'changePassword' ? (
                            <>
                                <RegistrationModalComposed.Input
                                    id="helpSidebarPassword"
                                    name="password"
                                    type="password"
                                    label="New password"
                                    value={password}
                                    placeholder="Type your password"
                                    error={passwordError}
                                    onChange={formHandler.handleInputValue}
                                />
                                <RegistrationModalComposed.Input
                                    id="helpSidebarRepeatedPassword"
                                    name="repeatedPassword"
                                    type="password"
                                    label="Password again"
                                    value={repeatedPassword}
                                    placeholder="Type your password again"
                                    error={repeatedPasswordError}
                                    onChange={formHandler.handleInputValue}
                                />
                            </>
                        ) : (
                            <RegistrationModalComposed.Input
                                id="helpSidebarEmail"
                                name="email"
                                type="email"
                                label="Email address"
                                value={email}
                                placeholder="Type your email address"
                                error={emailError}
                                onChange={formHandler.handleInputValue}
                            />
                        )}
                        <RegistrationModalDashboard.Submit>
                            {issue === 'email'
                                ? 'Resend e-mail'
                                : issue === 'link'
                                ? 'Resend link'
                                : issue === 'password'
                                ? 'Request password change'
                                : issue === 'changePassword' && 'Change password'}
                        </RegistrationModalDashboard.Submit>
                        <ApiFeedback />
                    </StyledHelpSidebar.Form>
                )}
            </StyledHelpSidebar.Content>
        </HelpSidebarContainer>
    )
}

export default HelpSidebar
