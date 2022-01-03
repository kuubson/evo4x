import styled from 'styled-components/macro'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'

import Input from '../RegistrationModal/components/Input'

import { BlackLayer } from 'components/shared/styledComponents'
import * as StyledRegistrationModal from '../RegistrationModal/styled'
import * as Styled from './styled'

import { useHelpSidebar } from './hooks'

const HelpSidebarContainer = styled(BlackLayer)``

interface IHelpSidebar {
    showSidebar: boolean
    toggleSidebar: () => void
    hideSidebar: () => void
    showLoginModal: () => void
}

const HelpSidebar = ({ showSidebar, toggleSidebar, hideSidebar, showLoginModal }: IHelpSidebar) => {
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
        handleHelpSidebar,
        issues
    } = useHelpSidebar({
        toggleSidebar,
        hideSidebar,
        showLoginModal
    })
    const closeHelpSidebar = () => {
        setTimeout(() => setIssue(''), 600)
        toggleSidebar()
    }
    return (
        <HelpSidebarContainer showLayer={showSidebar}>
            <Styled.Content showSidebar={showSidebar}>
                <StyledRegistrationModal.CloseButton onClick={closeHelpSidebar}>
                    ✕
                </StyledRegistrationModal.CloseButton>
                {issues.map(({ issue, active, handleOnClick }) => (
                    <Styled.Issue key={issue} active={active} onClick={handleOnClick}>
                        {issue}
                    </Styled.Issue>
                ))}
                {issue && (
                    <Styled.Form onSubmit={handleHelpSidebar} noValidate>
                        {issue === 'changePassword' ? (
                            <>
                                <Input
                                    id="helpSidebarPassword"
                                    name="password"
                                    type="password"
                                    label="New password"
                                    value={password}
                                    placeholder="Type your password"
                                    error={passwordError}
                                    onChange={formHandler.handleInputValue}
                                />
                                <Input
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
                            <Input
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
                        <StyledRegistrationModal.Submit>
                            {issue === 'email'
                                ? 'Resend e-mail'
                                : issue === 'link'
                                ? 'Resend link'
                                : issue === 'password'
                                ? 'Request password change'
                                : issue === 'changePassword' && 'Change password'}
                        </StyledRegistrationModal.Submit>
                        <ApiFeedback />
                    </Styled.Form>
                )}
            </Styled.Content>
        </HelpSidebarContainer>
    )
}

export default HelpSidebar
