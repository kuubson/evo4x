import styled from 'styled-components/macro'

export const Label = styled.label`
   font-size: 15px;
   @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
      font-size: 14px;
   }
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      font-size: 13px;
   }
   @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
      font-size: 12px;
   }
   @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
      font-size: 11px;
   }
`
