import styled from 'styled-components/macro'

export default styled.input`
    width: 100%;
    border-bottom: 1px solid black;
    padding: 10px 0px;
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
`
