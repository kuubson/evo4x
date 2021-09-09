import styled from 'styled-components/macro'

export default styled.li`
    margin-bottom: 30px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 18px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 16px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 14px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 12px;
    }
`
