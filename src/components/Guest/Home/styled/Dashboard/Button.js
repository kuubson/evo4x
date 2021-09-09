import styled, { css } from 'styled-components/macro'

export default styled.button`
    border-bottom: 3px solid ${({ theme }) => theme.primaryColor};
    margin: 60px auto 0px auto;
    padding: 15px 20px 10px 20px;
    text-shadow: 1px 1px white;
    font-size: 22px;
    transition: all ease-in-out 0.3s;
    transition-property: border-radius, box-shadow;
    &:hover {
        border-radius: 10px;
        box-shadow: inset 0px -58px ${({ theme }) => theme.primaryColor};
    }
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        font-size: 20px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        font-size: 18px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        margin-top: 30px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        font-size: 16px;
        padding: 13px 15px 8px 15px;
    }
    @media (max-width: ${({ theme }) => theme.fifthBreakpoint}) {
        font-size: 14px;
    }
    ${({ $fill }) =>
        $fill &&
        css`
            border-radius: 10px;
            box-shadow: inset 0px -58px ${({ theme }) => theme.primaryColor};
        `}
`
