import styled from 'styled-components/macro'

export const Button = styled.button`
   background: black;
   color: white;
   font-size: 14px;
   border-radius: 5px;
   @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
      font-size: 13px;
   }
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      font-size: 12px;
   }
`
