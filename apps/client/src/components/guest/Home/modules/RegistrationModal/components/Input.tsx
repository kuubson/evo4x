import styled from 'styled-components/macro'

import * as Styled from '../styled'

const InputContainer = styled.div`
   width: 100%;
   margin-bottom: 20px;
   &:last-of-type {
      margin-bottom: 0px;
   }
`

interface IInput {
   id: string
   name: string
   type: 'textarea' | 'text' | 'email' | 'password'
   label: string
   value: string
   placeholder: string
   error: string
   onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

const Input = ({ id, name, type, label, value, placeholder, error, onChange }: IInput) => {
   return (
      <InputContainer>
         <Styled.Label htmlFor={id}>{label}</Styled.Label>
         {type === 'textarea' ? (
            <Styled.Textarea
               id={id}
               name={name}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
            />
         ) : (
            <Styled.Input
               id={id}
               name={name}
               type={type}
               value={value}
               placeholder={placeholder}
               onChange={onChange}
            />
         )}
         {error && <Styled.Error>{error}</Styled.Error>}
      </InputContainer>
   )
}

export default Input
