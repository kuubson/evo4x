import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'
import StyledHelpSidebar from 'components/Guest/Home/styled/HelpSidebar'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import helpSidebarUtils from './utils'

import helpSidebarHelpers from './helpers'

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
    const params = hooks.useQueryParams()
    const [issue, setIssue] = useState<Issue>('')
    useEffect(() => {
        helpSidebarHelpers.handleQueryParams({
            params,
            setIssue,
            toggleSidebar,
            showLoginModal
        })
    }, [])
    const [form, setForm] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        repeatedPassword: '',
        repeatedPasswordError: ''
    })
    const formHandler = hooks.useFormHandler(setForm)
    const { email, emailError, password, passwordError, repeatedPassword, repeatedPasswordError } =
        form
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
                {helpSidebarUtils
                    .issues(issue, setIssue)
                    .map(({ issue, active, handleOnClick }) => (
                        <StyledHelpSidebar.Issue
                            key={issue}
                            active={active}
                            onClick={handleOnClick}
                        >
                            {issue}
                        </StyledHelpSidebar.Issue>
                    ))}
                {issue && (
                    <StyledHelpSidebar.Form
                        onSubmit={event =>
                            helpSidebarHelpers.handleHelpSidebar({
                                event,
                                form,
                                passwordToken: params.passwordToken,
                                setForm,
                                formHandler,
                                issue,
                                setIssue,
                                hideSidebar,
                                showLoginModal
                            })
                        }
                        noValidate
                    >
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
