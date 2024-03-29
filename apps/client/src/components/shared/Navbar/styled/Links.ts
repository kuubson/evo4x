import styled, { css } from 'styled-components/macro'

type StyledProps = {
   hamburger: boolean | undefined
}

export const Links = styled.ul<StyledProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   transition: all ease-in-out 0.3s;
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      ${({ hamburger }) =>
         hamburger &&
         css`
            transform: translateX(calc(100% + 41px));
         `}
   }
`
