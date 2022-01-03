import styled from 'styled-components/macro'

export const CloseButton = styled.div`
    font-size: 25px;
    font-weight: bold;
    text-shadow: 1px 1px white;
    cursor: pointer;
    position: absolute;
    top: 25px;
    right: 30px;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 23px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 21px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        font-size: 19px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 17px;
    }
`
