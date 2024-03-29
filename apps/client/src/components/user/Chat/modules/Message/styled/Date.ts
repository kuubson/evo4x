import styled, { css } from 'styled-components/macro'

type StyledProps = {
   withCurrentUser: boolean
   withLastUserMessage: boolean
   showDetails: boolean
}

export const Date = styled.div<StyledProps>`
   width: 100%;
   font-size: 12px;
   text-align: left;
   font-weight: bold;
   white-space: nowrap;
   @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
      font-size: 10px;
   }
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              text-align: right;
           `
         : null}
   ${({ withLastUserMessage, showDetails }) =>
      !withLastUserMessage && showDetails
         ? css`
              margin-bottom: 10px;
           `
         : null}
`
