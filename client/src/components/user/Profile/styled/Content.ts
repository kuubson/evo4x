import styled from 'styled-components/macro'

export const Content = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-around;
   align-items: center;
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      flex-direction: column;
   }
`
