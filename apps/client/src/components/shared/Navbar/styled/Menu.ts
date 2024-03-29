import styled, { css } from 'styled-components/macro'

type StyledProps = {
   withHamburger: boolean | undefined
}

export const Menu = styled.ul<StyledProps>`
   width: 100%;
   height: 100%;
   background: ${({ theme }) => theme.primaryColor};
   transition: transform ease-in-out 0.5s;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   position: fixed;
   top: 0px;
   left: 0px;
   transform: translateX(100%);
   z-index: 1;
   ${({ withHamburger }) =>
      withHamburger
         ? css`
              @media (max-width: 1000px) {
                 transform: translateX(0px);
              }
           `
         : null}
`
