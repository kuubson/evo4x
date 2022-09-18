import styled from 'styled-components/macro'

export const Input = styled.input`
   width: 100%;
   padding: 10px 0px;
   border-bottom: 1px solid black;
   @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
      font-size: 15px;
   }
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      font-size: 14px;
   }
   @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
      font-size: 13px;
   }
   @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
      font-size: 12px;
   }
`
