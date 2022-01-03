import styled from 'styled-components/macro'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'
import Input from '../RegistrationModal/components/Input'

import { BlackLayer } from 'components/shared/styledComponents'
import * as StyledRegistrationModal from '../RegistrationModal/styled'

import { useLoginModal } from './hooks'

const LoginModalContainer = styled(BlackLayer)``

interface ILoginModal {
    role: UserRoles
    setRole: ReactDispatch<UserRoles>
    showModal: boolean
    toggleModal: () => void
}

const LoginModal = ({ role, setRole, showModal, toggleModal }: ILoginModal) => {
    const {
        form: { email, emailError, password, passwordError },
        formHandler,
        login
    } = useLoginModal({
        role
    })
    const closeModal = () => {
        setRole('user')
        toggleModal()
    }
    return (
        <LoginModalContainer showLayer={showModal}>
            <StyledRegistrationModal.Content showModal={showModal}>
                <StyledRegistrationModal.CloseButton onClick={closeModal}>
                    ✕
                </StyledRegistrationModal.CloseButton>
                <StyledRegistrationModal.Header>
                    "Get rich or die trying"
                </StyledRegistrationModal.Header>
                <StyledRegistrationModal.Form onSubmit={login} noValidate>
                    <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        label="Email address"
                        value={email}
                        placeholder="Type your email address"
                        error={emailError}
                        onChange={formHandler.handleInputValue}
                    />
                    <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        placeholder="Type your password"
                        error={passwordError}
                        onChange={formHandler.handleInputValue}
                    />
                    <StyledRegistrationModal.Submit>Login</StyledRegistrationModal.Submit>
                    <ApiFeedback />
                </StyledRegistrationModal.Form>
            </StyledRegistrationModal.Content>
        </LoginModalContainer>
    )
}

export default LoginModal
