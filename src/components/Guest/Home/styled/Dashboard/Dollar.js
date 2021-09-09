import styled from 'styled-components/macro'

export default styled.div`
    margin-right: 10px;
    font-size: 25px;
    font-weight: bold;
    text-shadow: 2px 2px ${({ theme }) => theme.primaryColor};
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 23px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 21px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 19px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 17px;
    }
`
