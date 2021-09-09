import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import queryString from 'query-string'
import styled, { css } from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import RMDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'
import StyledHelpSidebar from '../styled/HelpSidebar'

import RMComposed from 'components/Guest/Modals/RegistrationModal/composed'

import utils from 'utils'

const HelpSidebarContainer = styled.section`
    width: 100%;
    height: 100%;
    transition: background ease-in-out 0.3s;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    z-index: 1;
    pointer-events: none;
    ${({ showSidebar }) =>
        showSidebar &&
        css`
            background: rgba(0, 0, 0, 0.5);
            pointer-events: auto;
        `}
`

const HelpSidebar = ({ showSidebar, toggleSidebar, hideSidebar, showLoginModal }) => {
    const { token } = queryString.parse(useLocation().search)
    useEffect(() => {
        if (token) {
            setIssue('resetPassword')
            toggleSidebar()
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
        if (issue === 'resetPassword') {
            if (!formHandler.validatePassword(password)) validated = false
            if (!formHandler.validateRepeatedPassword(repeatedPassword, password)) validated = false
        } else {
            if (!formHandler.validateEmail(email)) validated = false
        }
        return validated
    }
    const handleHelpSidebar = async e => {
        e.preventDefault()
        if (validate()) {
            try {
                if (issue === 'resetPassword') {
                    const url = '/api/user/changePassword'
                    const response = await utils.axios.post(url, {
                        password,
                        repeatedPassword,
                        passwordToken: token
                    })
                    if (response) {
                        setIssue('')
                        hideSidebar()
                        showLoginModal()
                    }
                } else {
                    const url = `/api/user/${
                        issue === 'password' ? 'resetPassword' : 'resendEmail'
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
            issue: 'Have not receieved any e-mail?',
            active: issue === 'email',
            handleOnClick: () => setIssue('email')
        },
        {
            issue: 'Activation link has expired?',
            active: issue === 'link',
            handleOnClick: () => setIssue('link')
        },
        {
            issue: 'Forgot password?',
            active: issue === 'password' || issue === 'resetPassword',
            handleOnClick: () => setIssue('password')
        }
    ]
    return (
        <HelpSidebarContainer showSidebar={showSidebar}>
            <StyledHelpSidebar.Content showSidebar={showSidebar}>
                <RMDashboard.CloseButton
                    onClick={() => {
                        setTimeout(() => setIssue(''), 600)
                        toggleSidebar()
                    }}
                >
                    ✕
                </RMDashboard.CloseButton>
                {issues.map(({ issue, active, handleOnClick }) => (
                    <StyledHelpSidebar.Issue
                        active={active}
                        onClick={() => {
                            utils.setApiFeedback('')
                            handleOnClick()
                        }}
                    >
                        {issue}
                    </StyledHelpSidebar.Issue>
                ))}
                {issue && (
                    <StyledHelpSidebar.Form onSubmit={handleHelpSidebar} noValidate>
                        {issue === 'resetPassword' ? (
                            <>
                                <RMComposed.Input
                                    id="helpSidebarPassword"
                                    name="password"
                                    type="password"
                                    label="New password"
                                    value={password}
                                    placeholder="Type your password"
                                    error={passwordError}
                                    onChange={formHandler.handleInputValue}
                                />
                                <RMComposed.Input
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
                            <RMComposed.Input
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
                        <RMDashboard.Submit scaleIn>
                            {issue === 'email'
                                ? 'Resend e-mail'
                                : issue === 'link'
                                ? 'Resend link'
                                : issue === 'password'
                                ? 'Reset password'
                                : issue === 'resetPassword' && 'Change password'}
                        </RMDashboard.Submit>
                        <ApiFeedback />
                    </StyledHelpSidebar.Form>
                )}
            </StyledHelpSidebar.Content>
        </HelpSidebarContainer>
    )
}

export default HelpSidebar
