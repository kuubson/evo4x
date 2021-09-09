import styled, { css } from 'styled-components/macro'

export default styled.img`
    width: 200px;
    margin-bottom: 50px;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        width: 150px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        width: 130px;
    }
    ${({ mobile }) =>
        mobile &&
        css`
            display: none;
            @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
                width: 80px;
                display: block;
                margin: 30px auto 0px auto;
            }
            @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
                width: 70px;
            }
            @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
                width: 60px;
            }
        `}
`
