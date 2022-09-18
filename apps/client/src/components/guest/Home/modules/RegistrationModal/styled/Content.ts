import styled, { css } from 'styled-components/macro'

type StyledProps = {
   showModal: boolean
}

export const Content = styled.dialog<StyledProps>`
   width: 50%;
   min-height: 70%;
   background: ${({ theme }) => theme.primaryColor};
   padding: 40px 0px;
   border-radius: 10px;
   transition: width ease-in-out 0.3s, min-height ease-in-out 0.3s, border-radius ease-in-out 0.3s,
      transform ease-in-out 0.6s, top ease-in-out 0.6s;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   position: absolute;
   top: 0%;
   left: 50%;
   transform: translate(-50%, -100%);
   @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
      width: 60%;
   }
   @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
      width: 80%;
   }
   @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
      width: 100%;
      min-height: 100%;
      border-radius: 0px;
   }
   ${({ showModal }) =>
      showModal
         ? css`
              top: 50%;
              transform: translate(-50%, -50%);
           `
         : null}
`
