import styled, { css } from 'styled-components/macro'

export default styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out 0.3s;
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        ${({ hamburger }) =>
            hamburger &&
            css`
                transform: translateX(calc(100% + 41px));
            `}
    }
`
