import styled, { css } from 'styled-components/macro'

type Props = {
    withHamburger: boolean | undefined
}

export const Hamburger = styled.div<Props>`
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    transition-property: right, transform;
    position: absolute;
    top: 50%;
    right: calc(0% - 40px);
    transform: translate(-50%, -50%);
    z-index: 2;
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        right: calc(0% + 20px);
    }
    ${({ withHamburger }) =>
        withHamburger
            ? css`
                  transform: translate(-50%, -50%) rotate(45deg);
              `
            : null}
`
