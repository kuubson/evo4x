import React from 'react'
import styled from 'styled-components/macro'

import helpSidebarHooks from './hooks'

import ApiFeedback from 'components/Shared/ApiFeedback/ApiFeedback'

import sharedStyled from 'components/Shared/styled'
import StyledHelpSidebar from 'components/Guest/Home/styled/HelpSidebar'
import RegistrationModalDashboard from 'components/Guest/Modals/RegistrationModal/styled/Dashboard'

import RegistrationModalComposed from 'components/Guest/Modals/RegistrationModal/composed'

import helpSidebarUtils from './utils'

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
    const {
        form: {
            email,
            emailError,
            password,
            passwordError,
            repeatedPassword,
            repeatedPasswordError
        },
        formHandler,
        issue,
        setIssue,
        handleHelpSidebar
    } = helpSidebarHooks.useHelpSidebar({
        toggleSidebar,
        hideSidebar,
        showLoginModal
    })
    const renderIssues = () => {
        return helpSidebarUtils.issues(issue, setIssue).map(({ issue, active, handleOnClick }) => (
            <StyledHelpSidebar.Issue key={issue} active={active} onClick={handleOnClick}>
                {issue}
            </StyledHelpSidebar.Issue>
        ))
    }
    const closeHelpSidebar = () => {
        setTimeout(() => setIssue(''), 600)
        toggleSidebar()
    }
    return (
        <HelpSidebarContainer showLayer={showSidebar}>
            <StyledHelpSidebar.Content showSidebar={showSidebar}>
                <RegistrationModalDashboard.CloseButton onClick={closeHelpSidebar}>
                    ✕
                </RegistrationModalDashboard.CloseButton>
                {renderIssues()}
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
