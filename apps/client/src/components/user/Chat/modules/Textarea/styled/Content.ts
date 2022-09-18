import styled from 'styled-components/macro'

export const Content = styled.textarea`
   width: 100%;
   height: 100%;
   padding: 10px 15px;
   background: transparent;
   font-size: 14px;
   border: none;
   resize: none;
   ::-webkit-scrollbar {
      display: none;
   }
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      padding: 8px 10px;
      font-size: 12px;
   }
`
