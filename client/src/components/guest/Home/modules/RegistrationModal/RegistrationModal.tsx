import styled from 'styled-components/macro'

import * as Styled from './styled'

import ApiFeedback from 'components/shared/ApiFeedback/ApiFeedback'
import { BlackLayer } from 'components/shared/styledComponents'

import { useRegistrationModal } from './hooks'

import Input from './components/Input'

const RegistrationModalContainer = styled(BlackLayer)``

interface IRegistrationModal {
   showModal: boolean
   toggleModal: () => void
}

const RegistrationModal = ({ showModal, toggleModal }: IRegistrationModal) => {
   const {
      form: {
         name,
         nameError,
         email,
         emailError,
         password,
         passwordError,
         repeatedPassword,
         repeatedPasswordError,
      },
      formHandler: { handleInputValue },
      register,
   } = useRegistrationModal()
   const formCompleted = !!name && !!email && !!password && !!repeatedPassword
   return (
      <RegistrationModalContainer showLayer={showModal}>
         <Styled.Content showModal={showModal}>
            <Styled.CloseButton onClick={toggleModal}>✕</Styled.CloseButton>
            <Styled.Header scaleOut={formCompleted}>
               {`"You either win or learn - 
                    not win or lose"`}
            </Styled.Header>
            <Styled.Form onSubmit={register} noValidate>
               <Input
                  id="name"
                  name="name"
                  type="text"
                  label="Name"
                  value={name}
                  placeholder="Type your name"
                  error={nameError}
                  onChange={handleInputValue}
               />
               <Input
                  id="registrationEmail"
                  name="email"
                  type="email"
                  label="Email address"
                  value={email}
                  placeholder="Type your email address"
                  error={emailError}
                  onChange={handleInputValue}
               />
               <Input
                  id="registrationPassword"
                  name="password"
                  type="password"
                  label="Password"
                  value={password}
                  placeholder="Type your password"
                  error={passwordError}
                  onChange={handleInputValue}
               />
               <Input
                  id="registrationRepeatedPassword"
                  name="repeatedPassword"
                  type="password"
                  label="Password again"
                  value={repeatedPassword}
                  placeholder="Type your password again"
                  error={repeatedPasswordError}
                  onChange={handleInputValue}
               />
               <Styled.Submit scaleIn={formCompleted}>Join evo4x</Styled.Submit>
               <ApiFeedback />
            </Styled.Form>
         </Styled.Content>
      </RegistrationModalContainer>
   )
}

export default RegistrationModal
