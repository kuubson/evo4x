import styled from 'styled-components/macro'

export default styled.h1`
    font-size: 30px;
    text-shadow: 1px 1px black;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 28px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 26px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 24px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 22px;
    }
`
