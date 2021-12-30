import styled, { keyframes, css } from 'styled-components/macro'

const rotate = keyframes`
    0% {
        transform: rotateZ(0deg) scale(1);
    }
    50% {
        transform: rotateZ(360deg) scale(1.3);
    }
    100% {
        transform: rotateZ(720deg) scale(1);
    }
`

type Logo = {
    $loading: boolean
}

export default styled.img<Logo>`
    width: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px -10px black;
    transition: bottom ease-in-out 0.3s;
    animation: ${rotate} ease-in-out 2s infinite alternate 0.3s;
    position: fixed;
    bottom: -52px;
    left: 20px;
    z-index: 2;
    @media (max-width: ${({ theme }) => theme.firstBreakpoint}) {
        width: 38px;
    }
    @media (max-width: ${({ theme }) => theme.secondBreakpoint}) {
        width: 36px;
    }
    @media (max-width: ${({ theme }) => theme.thirdBreakpoint}) {
        width: 34px;
    }
    @media (max-width: ${({ theme }) => theme.fourthBreakpoint}) {
        width: 32px;
    }
    ${({ $loading }) =>
        $loading
            ? css`
                  bottom: 20px;
              `
            : null}
`
