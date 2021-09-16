import styled, { css } from 'styled-components/macro'

export default styled.li`
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
    }
    &:last-of-type {
        margin-right: 0px;
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 15px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 14px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 13px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 12px;
    }
    ${({ active }) =>
        active &&
        css`
            font-weight: bold;
            transform: scale(1.03);
        `}
`
