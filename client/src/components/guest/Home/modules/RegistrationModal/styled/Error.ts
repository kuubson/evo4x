import styled from 'styled-components/macro'

export const Error = styled.p`
   margin-top: 5px;
   font-size: 12px;
   text-align: left;
   @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
      font-size: 11px;
   }
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      font-size: 10px;
   }
`
