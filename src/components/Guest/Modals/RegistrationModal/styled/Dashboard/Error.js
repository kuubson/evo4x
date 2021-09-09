import styled from 'styled-components/macro'

export default styled.p`
    text-align: left;
    font-size: 12px;
    margin-top: 5px;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 11px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 10px;
    }
`
