import styled from 'styled-components/macro'

export const Brand = styled.h1`
    font-size: 30px;
    text-shadow: 1px 1px black;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 28px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 26px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        font-size: 24px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 22px;
    }
`
