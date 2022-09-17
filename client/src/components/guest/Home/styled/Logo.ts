import styled, { css } from 'styled-components/macro'

type StyledProps = {
   mobile?: boolean
}

export const Logo = styled.img<StyledProps>`
   width: 200px;
   margin-bottom: 50px;
   @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
      width: 150px;
   }
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      width: 130px;
   }
   ${({ mobile }) =>
      mobile
         ? css`
              display: none;
              @media (max-width: ${({ theme }) => theme.additionalBreakpoint}) {
                 width: 80px;
                 margin: 30px auto 0px auto;
                 display: block;
              }
              @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
                 width: 70px;
              }
              @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
                 width: 60px;
              }
           `
         : null}
`
