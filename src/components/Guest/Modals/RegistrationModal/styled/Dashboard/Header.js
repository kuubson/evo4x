import styled, { css } from 'styled-components/macro'

export default styled.h2`
    max-height: 92px;
    margin-bottom: 30px;
    font-size: 25px;
    white-space: pre-line;
    line-height: 2;
    font-weight: bold;
    text-shadow: 1px 1px white;
    transition: all 0.3s ease-in-out;
    transition-property: max-height, margin-bottom, transform;
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
    ${({ scaleOut }) =>
        scaleOut &&
        css`
            max-height: 0px;
            margin-bottom: 0px;
            transform: scale(0);
        `};
`
